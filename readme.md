# Aqua Max — Sistema de Monitoreo Inteligente del Agua

Plataforma web educativa e infraestructura de sensores IoT para el monitoreo, la deteccion de fugas y la formacion sobre el uso responsable del agua en las instituciones educativas oficiales de Santiago de Cali, Colombia.

Prototipo desarrollado en el marco de la Hackaton 2025 (Cali, Colombia) por estudiantes de dos instituciones educativas oficiales de la ciudad.

---

## 1. Advertencia importante: entorno simulado

**Aqua Max es una aplicacion web en un entorno simulado con fines exclusivamente educativos.** Todos los datos de sensores, alertas, reportes, mapas y consumos que se muestran en la plataforma son **datos de demostracion generados en el codigo**, no lecturas reales de campo.

Consecuencias practicas de lo anterior:

- La plataforma funciona sin servidor, sin base de datos y sin conexion a hardware.
- La seccion de inversion presenta **estimaciones de presupuesto**, construidas con precios de mercado verificados, pero que deben reemplazarse por cotizaciones reales antes de cualquier ejecucion.
- Los codigos de hardware (`sensors/`) y el esquema de base de datos (`database/`) son **material de referencia funcional** para una implementacion real, no componentes desplegados en produccion.

---

## 2. Descripcion general

Aqua Max integra tres componentes:

1. **Una plataforma web** (este repositorio) que centraliza el monitoreo en tiempo real, el reporte comunitario de fallas, el mapa georreferenciado de las sedes, la formacion ambiental, la gamificacion escolar y el analisis financiero del proyecto.
2. **Una capa de hardware IoT** (sensores de caudal, tarjetas ESP32, sensores de movimiento y de presion) que mide el consumo de agua en banos, bebederos, cocinas y tanques, y transmite los datos mediante WiFi y MQTT.
3. **Una capa de datos** (esquema relacional SQLite) que define como se almacenan instituciones, sensores, lecturas, alertas, reportes ciudadanos, zonas de riesgo, usuarios y notificaciones.

El objetivo pedagogico es que la comunidad educativa **detecte, reporte y actue** frente al desperdicio de agua, cerrando el ciclo entre la medicion tecnica y la accion cotidiana.

---

## 3. Problema que atiende el proyecto

El proyecto se apoya en las siguientes referencias publicas:

| Indicador | Valor | Fuente |
| --- | --- | --- |
| Perdidas de agua tratada en America Latina | 20 % a 40 % | UNESCO, 2023 |
| Acueductos colombianos con perdidas superiores al 30 % | 51 % | IDEAM, 2022 |
| Sedes educativas encuestadas que cumple condiciones adecuadas de servicios publicos | 12,8 % | Procuraduria General de la Nacion, 2022 |
| Retorno por cada dolar invertido en reduccion de fugas | hasta 5 dolares | World Bank, 2022 |
| Consumo promedio de agua por persona al dia | 150 L | OPS/OMS |

Adicionalmente, el proyecto toma como antecedentes de exito el reporte del Ministerio de Educacion sobre 326,7 millones de litros ahorrados en 62 centros educativos, y el programa de uso eficiente del agua en colegios de Bogota, que logro una reduccion cercana al 10 % del consumo.

Una fuga equivalente a un litro por minuto desperdicia 43,2 metros cubicos al mes; un goteo continuo equivale a cerca de 11.000 litros al ano.

---

## 4. Equipo de trabajo

El proyecto fue desarrollado por diez estudiantes de dos instituciones educativas oficiales de Santiago de Cali.

**I.E. Celmira Bueno de Orejuela**

| Integrante | Rol |
| --- | --- |
| Joshua David Gonzalez Chacon | Programador |
| Jose Gabriel Vargas Rodelo | Programador |
| Miguel Angel Meneses | Innovador |
| Samuel Gomez Gonzalez | Innovador |
| Andres Felipe Chevez Arboleda | Disenador |

**I.E. Joaquin de Cayzedo y Cuero**

| Integrante | Rol |
| --- | --- |
| Luis Fernando Ruiz Mijares | Ideador |
| Yean Carlos Jaramillo Gonzalez | Ideador |
| Sara Isabel Orozco Moreno | Ideadora |
| Luciana Marin Vidal | Disenadora |
| Antonella Valentina Negrin Lezama | Disenadora |

---

## 5. Arquitectura tecnica

### 5.1 Tecnologias utilizadas

| Capa | Tecnologia |
| --- | --- |
| Estructura | HTML5 semantico |
| Presentacion | CSS3 artesanal (sin frameworks), diseno adaptable (responsive) |
| Logica de interfaz | JavaScript vainilla (ES5 compatible), sin frameworks |
| Graficas | Chart.js 4.4.1 |
| Mapas | Leaflet 1.9.4 con mosaicos (tiles) de CARTO |
| Respaldo de mapa | Mapas SVG generados en JavaScript, funcionales sin conexion |
| Iconografia | Objetos CSS artesanales (clase `.ico`), sin imagenes ni emojis |
| Firmware de sensores | Arduino y ESP32 (C++), MQTT sobre WiFi |
| Base de datos | SQLite |
| Generacion de documentos | Python 3 con la libreria ReportLab |

### 5.2 Modelo de ejecucion

La plataforma **no requiere servidor, compilacion ni instalacion de dependencias**. Es un conjunto de archivos estaticos que se ejecutan directamente en el navegador:

- Los datos viven en memoria, declarados en `src/js/main.js` como arreglos de JavaScript.
- No hay peticiones a un backend.
- Chart.js y Leaflet se cargan desde redes de distribucion de contenido (jsdelivr y unpkg), por lo que **se recomienda conexion a Internet** para ver graficas y el mapa interactivo. Si no hay conexion, el mapa SVG de respaldo (`src/js/map.js`) se dibuja de forma automatica, de modo que la seccion de mapa nunca queda vacia.

### 5.3 Archivos de ejecucion

El sitio se compone exclusivamente de estos archivos:

```text
index.html                    Pagina unica con las 18 secciones
src/css/style.css             Totalidad de los estilos y la iconografia
src/js/main.js                Logica de la plataforma y los datos simulados
src/js/map.js                 Mapa SVG de respaldo (sin conexion)
src/js/map_interactive.js     Mapa Leaflet interactivo con mosaicos CARTO
src/img/Logo.png              Logo institucional del proyecto
```

---

## 6. Instalacion y ejecucion

1. Descargue o clone el repositorio.
2. Abra el archivo `index.html` con doble clic, o bien con la extension Live Server de Visual Studio Code.
3. Navegue con la barra lateral, que es desplegable: puede ocultarla con el boton de la esquina superior derecha de la barra y volver a mostrarla con el boton de menu. La plataforma recuerda su preferencia.

No se requiere Node.js, ni Python, ni un servidor web, ni configuracion alguna para ver la plataforma.

**Requisito opcional:** para regenerar los documentos PDF y ejecutar los verificadores de calidad se necesita Python 3. Los PDF requieren ademas la libreria ReportLab:

```bash
python -m pip install reportlab
```

---

## 7. Estructura del repositorio

```text
Aqua Max/
|
├── index.html                       Pagina principal (18 secciones, barra lateral desplegable)
├── README.md                        Este documento
|
├── src/
│   ├── css/
│   │   └── style.css                Estilos, iconografia CSS, barra lateral, graficas y tablas
│   ├── img/
│   │   └── Logo.png                 Logo institucional (barra lateral, cabecera y pie)
│   └── js/
│       ├── main.js                  Datos simulados y logica de toda la plataforma
│       ├── map.js                   Mapa SVG de respaldo, funcional sin Internet
│       └── map_interactive.js       Mapa Leaflet interactivo (mosaicos CARTO)
|
├── sensors/                         EJEMPLOS DE CODIGO DE HARDWARE
│   ├── arduino_sensor.ino           Lectura del sensor de caudal YF-S201 con Arduino
│   └── esp32_sensor.ino             Lectura de caudal, movimiento y presion; envio por MQTT
|
├── database/                        EJEMPLO DE BASE DE DATOS
│   └── schema.sql                   Esquema SQLite completo con datos de ejemplo y una vista
|
├── docs/
│   ├── manual-instalacion-sensores.pdf
│   ├── guia-reporte-estudiantes.pdf
│   ├── protocolo-ante-fugas.pdf
│   ├── ficha-tecnica-plataforma.pdf
│   ├── inversion-presupuesto.pdf
│   └── politica-datos-escolares.pdf
|
├── utils/                           ANEXOS Y FUENTES DE DATOS
│   ├── emcali_tarifas.pdf           Documento oficial de tarifas de EMCALI
│   ├── emcali_tarifas.txt           Texto extraido del documento anterior
│   └── chats_presupuesto/
│       ├── chat1.txt                Conversaciones tecnicas de referencia del presupuesto
│       ├── chat2.txt
│       └── chat3.txt
|
├── pdf_base.py                      Utilidad comun de maquetacion de los PDF
├── pdf_doc1.py .. pdf_doc6.py       Generadores de cada documento PDF
├── extract_chats.py                 Extractor de las conversaciones de referencia
├── verify_map.py                    Verificador de la seccion de mapa
├── verify_inversion.py              Verificador de la seccion de inversion
├── check_html_tables.py             Verificador de la estructura de tablas del HTML
├── check_js.py                      Verificador de balance de sintaxis del JavaScript
├── check_sidebar.py                 Verificador de los elementos de la barra lateral
└── check_logo.py                    Verificador de las referencias del logo institucional
```

---

## 8. Mapa de ejemplos de codigo en el repositorio

Esta seccion responde a la pregunta mas frecuente de quien revisa el proyecto: **donde esta cada ejemplo de codigo**. Todo el material tecnico de referencia esta incluido y es funcional.

| Que desea ver | Archivo | Contenido que encontrara |
| --- | --- | --- |
| Codigo del sensor de caudal en Arduino | `sensors/arduino_sensor.ino` | Lectura del YF-S201 por interrupcion externa, conversion de pulsos a litros por segundo, calculo de flujo y total acumulado, impresion por puerto serie y notas de calibracion |
| Codigo del nodo WiFi en ESP32 | `sensors/esp32_sensor.ino` | Lectura simultanea de caudal, movimiento (PIR) y presion; conexion a WiFi; publicacion MQTT; deteccion de anomalias con umbrales y envio de alertas en formato JSON |
| Estructura de la base de datos | `database/schema.sql` | Ocho tablas, un indice, una vista de resumen por zona y datos de ejemplo (instituciones, sensores, zonas de alerta, usuarios y reportes) |
| Datos simulados de la plataforma | `src/js/main.js` | Arreglos `sensoresData`, `zonasFallas`, `comunasData`, `institucionesData`, `alertasData`, `reportesData`, `misionesData` y los diez retos del cuestionario |
| Interfaz, estilos e iconografia | `src/css/style.css` | Variables de color, barra lateral desplegable, tarjetas, tablas, graficas y los iconos dibujados por completo con CSS |
| Mapa georreferenciado | `src/js/map_interactive.js` y `src/js/map.js` | Construccion del mapa Leaflet con marcadores por estado, y el mapa SVG de respaldo sin conexion |
| Generacion de documentos PDF | `pdf_base.py` y `pdf_doc1.py` a `pdf_doc6.py` | Maquetacion programatica y contenido de los seis manuales del proyecto |
| Fuentes de precios y tarifas | `utils/emcali_tarifas.txt` y `utils/chats_presupuesto/` | Tarifas oficiales de EMCALI y las conversaciones tecnicas que originaron el presupuesto |

---

## 9. Funcionamiento de la plataforma web

La pagina es una **aplicacion de una sola pagina** (SPA sin enrutador) con 18 secciones navegables por desplazamiento suave. La barra lateral contiene quince accesos y la cabecera cuatro accesos rapidos.

| Seccion | Identificador | Funcionamiento |
| --- | --- | --- |
| Inicio | `#inicio` | Portada con el resumen del sistema y contadores animados: puntos de monitoreo, alertas del dia y reportes de la comunidad |
| Concientizacion: Cada Gota Cuenta | `#concientizacion` | Presenta la campana escolar, sus cuatro pasos (Detecta, Reporta, Actua, Celebra) y las fases de trabajo |
| Panel de Monitoreo en Tiempo Real | `#dashboard` | Muestra los sensores activos con su estado, la grafica de consumo de las ultimas 24 horas, la lista de alertas por comuna y las alertas automaticas generadas por los sensores |
| Mapa de Instituciones y Fallas | `#mapa` | Mapa interactivo con las 240 instituciones educativas, los 8 sensores y las 4 zonas de falla clasificadas por severidad; incluye respaldo sin conexion |
| Reportar una Falla | `#reportes` | Formulario comunitario con tipo de reporte, direccion, descripcion, telefono y carga de fotografia como evidencia |
| Noticias del Agua Escolar | `#noticias` | Novedades de la red educativa |
| Analisis Predictivo del Sistema | `#sistema` | Explica la deteccion automatica de fugas y el mantenimiento predictivo, y lista las fugas detectadas por los sensores |
| Concienciacion y Cuidado del Agua | `#concienciacion` | Indicadores ambientales con su fuente y recomendaciones de ahorro |
| Diagnostico de la Red Escolar | `#diagnostico` | Compara el caudal actual con el historico de cada sede y alerta cuando supera el 150 % del promedio |
| Estadisticas por Institucion | `#estadisticas` | Graficas comparativas de consumo y ahorro entre instituciones |
| Inversion | `#inversion` | Presupuesto integral del proyecto para las 240 sedes, con detalle por componentes, obra hidraulica, mano de obra, software, mantenimiento y retorno esperado |
| Administracion | `#administracion` | Panel de gestion de instituciones vinculadas, sensores asignados, ahorro registrado y estado de cada sede |
| Creadores | `#creadores` | Presentacion del equipo estudiantil por institucion educativa |
| Cuestionario del Agua | `#quiz` | Diez retos rapidos de educacion ambiental; cada respuesta correcta suma 50 litros simulados al ahorro de la comuna |
| Misiones del Agua | `#misiones` | Cinco misiones con puntaje y estado de cumplimiento, marcables por el usuario |
| Instituciones por Comunas | `#instituciones` | Directorio oficial de las 240 instituciones, organizado por comuna, con sus barrios y buscador por nombre, barrio o numero de comuna |
| Perfil de la Institucion | `#perfil` | Formulario con los datos de la sede y su responsable |
| Documentacion | `#documentacion` | Acceso a los seis documentos PDF del proyecto |

La cabecera mantiene accesos directos a Tablero, Mapa, Reportes y Guias, un indicador de estado del sistema y un reloj en tiempo real.

---

## 10. Modulos de JavaScript y datos simulados

### 10.1 `src/js/main.js`

Contiene el conjunto de datos de demostracion y las funciones que construyen cada vista:

| Estructura | Cantidad | Descripcion |
| --- | --- | --- |
| `sensoresData` | 8 sensores | Puntos de monitoreo con institucion, comuna, coordenadas, caudal actual, caudal normal, estado y tipo (tanque, flujo, bebedero, riego, cocina) |
| `zonasFallas` | 4 zonas | Zonas de falla con severidad de 1 a 4 y causa probable |
| `comunasData` | 21 comunas | Comuna 1 a Comuna 21 con sus barrios y el listado de instituciones educativas de cada una |
| `institucionesData` | 240 instituciones | Sede, comuna, sensores asignados, ahorro en litros y estado |
| `alertasData` | 3 alertas | Alertas con gravedad (ALTA o MEDIA) y estado de gestion |
| `reportesData` | 3 reportes | Reportes comunitarios con tipo, direccion, descripcion y estado |
| `misionesData` | 5 misiones | Misiones con puntaje y estado de cumplimiento |
| Retos del cuestionario | 10 retos | Preguntas con tres opciones cada una y respuesta correcta |

El total de instituciones se calcula dinamicamente, de modo que la plataforma siempre informa el numero real de sedes de la red: 240 instituciones educativas oficiales, de las cuales 231 son nombres distintos y 9 corresponden a instituciones con dos sedes registradas.

### 10.2 Comportamientos automatizados

- **Reloj del sistema:** se actualiza cada segundo.
- **Simulacion en tiempo real:** el caudal de los sensores varia periodicamente para representar la operacion de la red.
- **Alertas automaticas:** se generan a partir de los sensores cuyo estado no es normal.
- **Diagnostico:** clasifica los sensores en alerta, en revision y normales, y calcula indicadores agregados.
- **Ahorro acumulado:** se suma el ahorro de todas las instituciones para alimentar las estadisticas y las graficas.

---

## 11. Funcionamiento del componente fisico

### 11.1 Componentes

| Componente | Funcion | Caracteristicas tecnicas |
| --- | --- | --- |
| Sensor de caudal YF-S201 | Mide el agua que circula por la tuberia | Turbina con sensor de efecto Hall; 450 pulsos equivalen a 1 litro; rango de 1 a 30 L/min; alimentacion de 5 V; salida digital por pulsos |
| Modulo ESP32-S3 DevKit | Adquiere y transmite los datos | Lee hasta 4 sensores por tarjeta; transmite cada 5 segundos por WiFi; el caudal se lee por entrada digital, sin necesidad de conversion analogica |
| Sensor PIR HC-SR501 | Detecta presencia de personas | Permite distinguir un grifo abierto sin personas de un consumo normal |
| Sensor de presion MPX5010DP | Mide la presion en la tuberia | Salida analogica leida por el convertidor ADC del ESP32 |
| Fuente AC/DC de 120 V a 5 V | Alimenta el nodo | Toma la energia de la red electrica del colegio; los nodos no se conectan en cadena |

### 11.2 Logica de deteccion

Los umbrales configurados en el firmware son:

- Caudal superior a 5,0 L/s: fuga probable.
- Caudal superior a 1,0 L/s sin deteccion de movimiento: grifo abierto.
- Lectura de presion inferior a 1000: presion baja.
- Lectura de presion superior a 3500: presion alta.

En la plataforma, el analisis predictivo compara el caudal actual con el historico de cada sede y genera una alerta cuando lo supera en un 150 %.

### 11.3 Comunicacion

El nodo ESP32 publica en un intermediario MQTT publico de pruebas:

- `aqua_max/flujo/S001` — telemetria, cada 5 segundos.
- `aqua_max/alertas` — alertas automaticas en formato JSON con tipo, descripcion, sensor y marca de tiempo.

### 11.4 Instalacion fisica del sistema

El punto de medicion se instala **en linea con la tuberia**, no como un accesorio externo:

1. Corte el tramo de tuberia y reduzca la conexion a media pulgada.
2. Instale el sensor de caudal en la direccion correcta del flujo, sellando con cinta de teflon.
3. Cablee la senal hacia el modulo ESP32 y alimente el nodo con la fuente de 5 V.
4. Proteja las conexiones con caja, prensaestopas y sellado.
5. Verifique la lectura de pulsos con el monitor serie del entorno de desarrollo.
6. Calibre el sensor contra el medidor del acueducto de la sede.

Antes de instalar los sensores se realiza una adecuacion hidraulica menor de cada punto: renovacion de tramos corroidos, llaves de paso por punto, reduccion a media pulgada, sellado y pruebas de presion. La reposicion estructural de redes muy danadas se maneja como partida presupuestal independiente.

### 11.5 Mantenimiento

- El sensor de caudal tiene una vida util superior a los 300.000 ciclos.
- Se previene el reemplazo del 10 % de los sensores por ano (atascamiento por sarro, golpes o deterioro del cableado).
- Se previene el reemplazo del 5 % de las fuentes y tarjetas por ano.
- Cuadrillas tecnicas realizan dos visitas por sede al ano, con recalibracion contra el medidor del acueducto dos veces al ano.

El codigo completo y comentado del hardware esta en `sensors/arduino_sensor.ino` y `sensors/esp32_sensor.ino`.

---

## 12. Base de datos

El archivo `database/schema.sql` define el modelo relacional del sistema en SQLite. La plataforma web no se conecta a esta base de datos (sus datos son simulados en memoria); el esquema es el modelo de datos previsto para una implementacion real.

### 12.1 Tablas

| Tabla | Contenido |
| --- | --- |
| `instituciones` | Instituciones educativas con sede, comuna, direccion, responsable, telefono y ahorro en litros |
| `sensores` | Sensores con institucion, zona, coordenadas, tipo, protocolo, umbrales, estado, ubicacion fisica y fechas de gestion |
| `lecturas_flujo` | Serie historica de lecturas: caudal en litros por segundo y por minuto, total acumulado, pulsos, presion y movimiento |
| `alertas_sistema` | Alertas generadas con tipo, descripcion, gravedad, estado, ubicacion, fecha de resolucion y notas |
| `reportes_ciudadanos` | Reportes de la comunidad con tipo, institucion, direccion, coordenadas, descripcion, telefono, imagen como DataURL, nombre del archivo y estado |
| `zonas_alerta` | Zonas de riesgo con radio, severidad, causa probable y numero de reportes |
| `usuarios` | Usuarios con rol (estudiante, docente, mantenimiento), institucion y estado |
| `notificaciones` | Notificaciones internas con destinatario, mensaje y estado de lectura |

### 12.2 Otros objetos

- **Indice** `idx_lecturas_sensor_fecha` sobre las lecturas, por sensor y fecha.
- **Vista** `v_resumen_por_zona`, que calcula por zona el numero de alertas activas, el caudal promedio y la ultima actividad.

### 12.3 Datos de ejemplo

El script incluye datos de demostracion: seis instituciones, ocho sensores, cuatro zonas de alerta, tres usuarios y tres reportes comunitarios con sus estados.

---

## 13. Documentacion del proyecto

La carpeta `docs/` contiene seis manuales en formato PDF, accesibles tambien desde la seccion Documentacion de la plataforma:

| Documento | Contenido resumido |
| --- | --- |
| `manual-instalacion-sensores.pdf` | Instalacion, conexionado, codigo y mantenimiento de los sensores |
| `guia-reporte-estudiantes.pdf` | Procedimiento paso a paso para reportar fallas con fotografia |
| `protocolo-ante-fugas.pdf` | Niveles de respuesta, roles y formatos de registro ante una fuga |
| `ficha-tecnica-plataforma.pdf` | Arquitectura, modulos, requisitos y plan de cobertura de las 240 sedes |
| `inversion-presupuesto.pdf` | Presupuesto integral, plan de fases y retorno de la inversion |
| `politica-datos-escolares.pdf` | Tratamiento de datos personales y de menores, conforme a la Ley 1581 de 2012 |

### 13.1 Regeneracion de los documentos

Los PDF se generan por programacion con Python y ReportLab:

```bash
python -m pip install reportlab
python -X utf8 pdf_doc1.py      # repita con pdf_doc2.py ... pdf_doc6.py
```

`pdf_base.py` concentra la maquetacion comun (encabezado, estilo de titulos, tablas y pie de pagina) para que los seis documentos mantengan un formato institucional uniforme.

---

## 14. Seccion de inversion: resumen del presupuesto

La seccion `#inversion` responde a la pregunta de cuanto costaria equipar la red completa de las 240 instituciones educativas oficiales de Cali.

### 14.1 Cifras principales

| Concepto | Valor |
| --- | --- |
| Componentes IoT | 333,7 millones de pesos |
| Adecuacion hidraulica | 374,3 millones de pesos |
| Mano de obra de instalacion | 597,6 millones de pesos |
| Desarrollo de software | 541,0 millones de pesos |
| Reserva, repuestos e impuestos | 249,8 millones de pesos |
| **Inversion total estimada** | **2.331 millones de pesos** |
| Operacion y mantenimiento anual | 264,8 millones de pesos por ano |
| Recuperacion de la inversion | 4 a 6 anos |

### 14.2 Base de calculo

- 240 instituciones educativas oficiales, 20 puntos de agua por sede.
- 4.800 sensores de caudal y 1.200 modulos ESP32 (cuatro sensores por tarjeta).
- Precio verificado del sensor YF-S201: 17.500 pesos. Precio verificado del modulo ESP32-S3: 39.000 pesos.
- Jornal tecnico de referencia: 120.000 pesos por dia.
- Tarifa oficial de EMCALI usada: 2.754,90 pesos por metro cubico de acueducto y 3.166,05 pesos por metro cubico de alcantarillado (uso Oficial y Especial), tomada del documento oficial incluido en `utils/emcali_tarifas.pdf`.
- Salarios de desarrollo segun la mediana del mercado colombiano (2025).

### 14.3 Escenarios de desperdicio y retorno

| Escenario | Perdida mensual por sede | Perdida anual en la red | Valor anual |
| --- | --- | --- | --- |
| Bajo | 20 m3 | 57.600 m3 | 341 millones |
| Medio | 50 m3 | 144.000 m3 | 853 millones |
| Alto | 100 m3 | 288.000 m3 | 1.705 millones |

Si el sistema permite recuperar el 30 % del escenario medio, el ahorro asciende a aproximadamente 256 millones de pesos al ano, lo que permite recuperar la inversion en un plazo de cuatro a seis anos, ademas del beneficio educativo y reputacional.

### 14.4 Plan de implementacion por fases

| Fase | Periodo | Alcance |
| --- | --- | --- |
| Fase 1: piloto | Meses 1 a 6 | 20 instituciones de las comunas con zonas de riesgo; validacion del modelo y calibracion |
| Fase 2: expansion | Meses 7 a 24 | 100 instituciones adicionales, priorizadas por mapa de fallas y consumo anomalo |
| Fase 3: cobertura total | Meses 25 a 42 | Las 120 instituciones restantes hasta completar las 240 sedes |
| Fase 4: operacion continua | Desde el mes 25 | Mantenimiento, soporte y campana educativa permanente |

Las cifras son estimaciones de presupuesto, no cotizaciones: deben verificarse por sede antes de cualquier ejecucion.

---

## 15. Campana educativa y gamificacion

La campana **Cada Gota Cuenta en tu Colegio**, con el lema **Cierra, Reporta, Ahorra**, se estructura en cuatro pasos:

1. **Detecta:** el medidor registra el agua que entra a la sede y el sensor verifica el flujo de cada punto; ante una fuga o una llave abierta se genera una alerta.
2. **Reporta:** estudiantes y docentes registran la novedad con fotografia desde la seccion Reportes, y el mapa marca el punto.
3. **Actua:** las brigadas del agua cierran llaves, promueven grifos pulsadores y comunican la novedad al area de mantenimiento.
4. **Celebra:** se publica el ranking por sede y la institucion con mayor ahorro recibe el Sello Azul Aqua Max del mes.

Componentes de motivacion:

- **Cuestionario del Agua:** diez retos rapidos; cada respuesta correcta suma 50 litros simulados al ahorro de la comuna.
- **Misiones del Agua:** cinco misiones con puntaje, marcables por el usuario.
- **Consejos de aplicacion inmediata:** cerrar el grifo durante el cepillado, instalar grifos pulsadores y reportar fugas.

---

## 16. Herramientas de verificacion de calidad

El repositorio incluye verificadores que comprueban la integridad del proyecto y que pueden ejecutarse tras cualquier modificacion:

| Script | Que verifica |
| --- | --- |
| `verify_map.py` | Estructura de la seccion de mapa, uso de mosaicos CARTO, respaldo SVG y orden de carga de los scripts |
| `verify_inversion.py` | Coherencia de la seccion de inversion, coherencia de los totales y existencia del PDF de presupuesto |
| `check_html_tables.py` | Estructura de las tablas del HTML (detecta contenido invalido dentro de tablas, que desalinea el diseno) |
| `check_js.py` | Balance de sintaxis de los tres archivos JavaScript |
| `check_sidebar.py` | Presencia y coherencia de los elementos de la barra lateral desplegable |
| `check_logo.py` | Referencias del logo y coincidencia exacta de mayusculas y minusculas con el archivo real |

Ejecucion:

```bash
python -X utf8 verify_map.py
python -X utf8 verify_inversion.py
python -X utf8 check_html_tables.py
python -X utf8 check_js.py
python -X utf8 check_sidebar.py
python -X utf8 check_logo.py
```

---

## 17. Anexos y fuentes de datos

La carpeta `utils/` conserva la evidencia documental que sustenta las cifras tecnicas y financieras:

- `emcali_tarifas.pdf`: documento oficial de tarifas del sistema de acueducto y alcantarillado, empleado para valorar el agua desperdiciada.
- `emcali_tarifas.txt`: version en texto del documento anterior, para consulta rapida y trazabilidad de los valores.
- `chats_presupuesto/chat1.txt`, `chat2.txt`, `chat3.txt`: conversaciones tecnicas de referencia que originaron la estructura del presupuesto, conservadas como memoria de calculo.
- `extract_chats.py`: utilidad que extrae y normaliza esas conversaciones a texto plano.

---

## 18. Proteccion de datos y menores de edad

El tratamiento de datos personales del proyecto se rige por la **Ley 1581 de 2012** de Colombia y las normas que la reglamentan. Aspectos relevantes:

- La plataforma no solicita datos personales de menores en su version simulada.
- Los reportes comunitarios permiten cargar una fotografia; en una implementacion real debe gestionarse **autorizacion previa de acudientes** cuando aparezcan menores de edad.
- Los campos de telefono y de responsable institucional se tratan como datos personales de acceso restringido.
- El detalle del tratamiento, los derechos de los titulares y los formatos de autorizacion se encuentran en `docs/politica-datos-escolares.pdf`.

---

## 19. Estado del proyecto y limitaciones conocidas

- Es un **prototipo educativo**: los datos son simulados y no provienen de sensores instalados.
- No hay backend ni autenticacion; la persistencia de la interfaz es local al navegador.
- El esquema de base de datos y el firmware son material de referencia funcional, pendientes de despliegue en campo.
- Las cifras de inversion son estimaciones que deben reemplazarse por cotizaciones reales.
- El consumo y el ahorro mostrados son datos de demostracion y no representan mediciones del mundo real.
- Requiere conexion a Internet para las graficas y el mapa interactivo; sin conexion, el mapa SVG de respaldo mantiene funcional la seccion.

---

## 20. Fuentes y referencias

- UNESCO (2023). Informe sobre el agua. Perdidas de agua tratada en America Latina y el Caribe.
- IDEAM (2022). Indicadores de perdidas en acueductos de Colombia.
- Procuraduria General de la Nacion (2022). Diagnostico de condiciones de acceso a servicios publicos en sedes educativas.
- World Bank (2022). Beneficios economicos de la reduccion de perdidas no contabilizadas.
- OPS/OMS. Consumo promedio de agua por persona al dia en America Latina.
- Ministerio de Educacion Nacional. Resultados de eficiencia hidrica en centros educativos.
- EMCALI EICE ESP. Tarifas del servicio de acueducto y alcantarillado (documento en `utils/`).
- Fichas tecnicas del sensor de caudal YF-S201 y del modulador MPX5010DP.

---

## 21. Como contribuir

1. Mantenga el estilo del proyecto: HTML, CSS y JavaScript vainilla, sin incorporar frameworks.
2. No utilice emojis ni imagenes para iconografia; use las clases `.ico` ya definidas.
3. Tras cualquier cambio, ejecute los verificadores de la seccion 16 y confirme que todos reporten exito.
4. Si modifica textos o cifras de la seccion de inversion, actualice en consecuencia el documento `docs/inversion-presupuesto.pdf`.
5. Conserve la advertencia de entorno simulado mientras los datos sigan siendo de demostracion.

---

## 22. Licencia y creditos

Proyecto educativo de codigo abierto, publicado bajo licencia **MIT**.

Desarrollado por el equipo estudiantil de la **I.E. Celmira Bueno de Orejuela** y la **I.E. Joaquin de Cayzedo y Cuero**, en Santiago de Cali, Colombia, 2025.

El agua que hoy reportamos es la que manana nos sobra.
