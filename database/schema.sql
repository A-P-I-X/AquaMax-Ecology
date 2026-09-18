/* AQUA MAX - Esquema SQLite - Red Educativa Santiago de Cali */
CREATE TABLE IF NOT EXISTS instituciones (
id TEXT PRIMARY KEY,
nombre TEXT NOT NULL,
sede TEXT,
comuna TEXT,
direccion TEXT,
responsable TEXT,
telefono TEXT,
ahorro_litros INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sensores (
id TEXT PRIMARY KEY,
nombre TEXT NOT NULL,
institucion_id TEXT,
zona TEXT NOT NULL,
latitud REAL NOT NULL,
longitud REAL NOT NULL,
tipo TEXT NOT NULL,
proto TEXT NOT NULL,
umbral_normal REAL NOT NULL,
umbral_alerta REAL,
estado TEXT NOT NULL,
ubicacion_fisica TEXT,
instalado_en TEXT,
id_encargado TEXT,
fecha_creacion TEXT NOT NULL DEFAULT (datetime('now')),
fecha_actualizacion TEXT
);
CREATE TABLE IF NOT EXISTS lecturas_flujo (
id INTEGER PRIMARY KEY AUTOINCREMENT,
sensor_id TEXT NOT NULL,
flujo_lps REAL NOT NULL,
flujo_lpm REAL NOT NULL,
total_litros REAL NOT NULL,
pulsos_por_seg INTEGER,
presion_adc INTEGER,
movimiento INTEGER,
fecha_hora TEXT NOT NULL DEFAULT (datetime('now')),
created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_lecturas_sensor_fecha ON lecturas_flujo(sensor_id, fecha_hora);
CREATE TABLE IF NOT EXISTS alertas_sistema (
id TEXT PRIMARY KEY,
sensor_id TEXT NOT NULL,
tipo_alerta TEXT NOT NULL,
descripcion TEXT NOT NULL,
gravedad TEXT NOT NULL,
estado TEXT NOT NULL,
latitud REAL,
longitud REAL,
fecha_hora TEXT NOT NULL DEFAULT (datetime('now')),
resuelto_en TEXT,
id_encargado TEXT,
notas TEXT
);
CREATE TABLE IF NOT EXISTS reportes_ciudadanos (
id TEXT PRIMARY KEY,
tipo_reporte TEXT NOT NULL,
institucion_id TEXT,
direccion TEXT NOT NULL,
latitud REAL,
longitud REAL,
descripcion TEXT,
telefono TEXT,
imagen_dataurl TEXT,
imagen_nombre TEXT,
fecha_reporte TEXT NOT NULL DEFAULT (datetime('now')),
estado TEXT NOT NULL DEFAULT 'Nuevo',
id_reportante TEXT
);
CREATE TABLE IF NOT EXISTS zonas_alerta (
id TEXT PRIMARY KEY,
nombre TEXT NOT NULL,
latitud REAL NOT NULL,
longitud REAL NOT NULL,
radio_metros INTEGER,
severidad INTEGER,
descripcion TEXT,
causa_probable TEXT,
fecha_deteccion TEXT,
reportes_count INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS usuarios (
id TEXT PRIMARY KEY,
nombre TEXT NOT NULL,
email TEXT,
telefono TEXT,
rol TEXT NOT NULL,
institucion_id TEXT,
activo INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS notificaciones (
id INTEGER PRIMARY KEY AUTOINCREMENT,
tipo TEXT NOT NULL,
destinatario TEXT NOT NULL,
mensaje TEXT NOT NULL,
leido INTEGER DEFAULT 0,
fecha_envio TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT OR IGNORE INTO instituciones VALUES
('IE01','I.E. Santa Librada','Principal - Comuna 3','Comuna 3','Calle 6 14-56, Cali','Rectoria','6021234567',12500),
('IE02','INEM Jorge Isaacs','Sede principal - Comuna 10','Comuna 10','Cra 52 2-51, Cali','Coordinacion','6022345678',8300),
('IE03','I.E. Normal Superior','Sede norte - Comuna 2','Comuna 2','Av 3N 46-45, Cali','Rectoria','6023456789',15200),
('IE04','I.E. Eustaquio Palacios','Sede centro - Comuna 11','Comuna 11','Calle 33 8-44, Cali','Coordinacion','6024567890',5400),
('IE05','I.E. San Luis','Campus sur - Comuna 22','Comuna 22','Calle 25 100-40, Cali','Rectoria','6025678901',3100),
('IE06','I.E. Tecnico Industrial','Sede talleres - Comuna 8','Comuna 8','Cra 15 20-30, Cali','Coordinacion','6026789012',0);
INSERT OR IGNORE INTO sensores VALUES
('S001','Tanque principal Bloque A','IE01','Comuna 3',3.4516,-76.532,'tanque','YF-S201',2.0,5.0,'Activo','Bloque A','2025-01-15',NULL,NULL,NULL),
('S002','Bateria de banos Piso 2','IE02','Comuna 10',3.43,-76.52,'flujo','YF-S201',2.5,6.0,'Activo','Bloque sur','2025-01-20',NULL,NULL,NULL),
('S003','Bebedero patio central','IE03','Comuna 2',3.47,-76.53,'bebedero','PIR',0.8,2.0,'Activo','Patio central','2025-02-01',NULL,NULL,NULL),
('S004','Tuberia laboratorio','IE04','Comuna 11',3.41,-76.54,'flujo','YF-S201',2.2,5.5,'Activo','Laboratorio','2025-02-05',NULL,NULL,NULL),
('S005','Riego cancha multiple','IE05','Comuna 22',3.38,-76.54,'riego','YF-S201',2.8,7.0,'Activo','Cancha','2025-02-10',NULL,NULL,NULL),
('S006','Cocina restaurante escolar','IE01','Comuna 3',3.452,-76.531,'cocina','YF-S201',0.6,2.5,'Activo','Cocina','2025-02-12',NULL,NULL,NULL),
('S007','Banos bloque B','IE03','Comuna 2',3.4705,-76.5295,'flujo','YF-S201',2.0,5.0,'Activo','Bloque B','2025-02-15',NULL,NULL,NULL),
('S008','Tanque de reserva','IE02','Comuna 10',3.4305,-76.5195,'tanque','YF-S201',1.9,4.5,'Activo','Reserva','2025-02-18',NULL,NULL,NULL);
INSERT OR IGNORE INTO zonas_alerta VALUES
('Z001','Comuna 10 INEM',3.43,-76.52,300,4,'Sobreconsumo en banos del bloque sur','Cisternas abiertas','2025-03-14',15),
('Z002','Comuna 2 Normal Superior',3.47,-76.53,250,2,'Bebedero con goteo continuo','Boton pegado','2025-03-13',8),
('Z003','Comuna 22 San Luis',3.38,-76.54,400,3,'Riego fuera de horario','Programacion manual','2025-03-15',22),
('Z004','Comuna 3 Santa Librada',3.4516,-76.532,200,1,'Consumo normal','Monitoreo preventivo','2025-03-15',3);
INSERT OR IGNORE INTO usuarios VALUES
('U001','Valentina Dominguez','valentina@colegio.edu.co','3101234567','estudiante','IE01',1),
('U002','Prof. Maria Rodriguez','maria@colegio.edu.co','3109876543','docente','IE02',1),
('U003','Carlos Mantenimiento','carlos@colegio.edu.co','3104567890','mantenimiento','IE01',1);
INSERT OR IGNORE INTO reportes_ciudadanos (id,tipo_reporte,institucion_id,direccion,descripcion,telefono,estado) VALUES
('R001','fuga','IE01','I.E. Santa Librada, Calle 6 14-56','Llave del bano goteando todo el dia','3001234567','Abierto'),
('R002','presion','IE02','INEM Jorge Isaacs, Cra 52 2-51','Sin agua en banos del bloque sur','3109876543','En revision'),
('R003','bebedero','IE03','I.E. Normal Superior, Av 3N 46-45','Bebedero con boton pegado','', 'Nuevo');
CREATE VIEW IF NOT EXISTS v_resumen_por_zona AS
SELECT s.zona, COUNT(DISTINCT a.id) as numero_alertas_activas,
ROUND(AVG(l.flujo_lps), 2) as flujo_promedio_lps, MAX(a.fecha_hora) as ultima_actividad
FROM sensores s
LEFT JOIN alertas_sistema a ON s.id = a.sensor_id AND a.estado != 'Cerrado'
LEFT JOIN lecturas_flujo l ON s.id = l.sensor_id AND date(l.fecha_hora) = date('now')
GROUP BY s.zona;
