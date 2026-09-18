/* Aqua Max - Red Educativa Santiago de Cali - Logica principal */
'use strict';
var sensoresData = [
{id:'S001',nombre:'Tanque principal Bloque A',institucion:'I.E. Santa Librada',zona:'Comuna 3',lat:3.4516,lng:-76.532,flujoActual:2.4,flujoNormal:2.0,estado:'Normal',tipo:'tanque',instalado:'2025-01-15'},
{id:'S002',nombre:'Bateria de banos Piso 2',institucion:'I.E. Jorge Isaacs',zona:'Comuna 4',lat:3.44,lng:-76.519,flujoActual:5.8,flujoNormal:2.5,estado:'ALERTA',tipo:'flujo',instalado:'2025-01-20'},
{id:'S003',nombre:'Bebedero patio central',institucion:'I.E. Normal Superior Santiago de Cali',zona:'Comuna 10',lat:3.435,lng:-76.510,flujoActual:1.2,flujoNormal:0.8,estado:'Normal',tipo:'bebedero',instalado:'2025-02-01'},
{id:'S004',nombre:'Tuberia laboratorio',institucion:'I.E. Eustaquio Palacios',zona:'Comuna 11',lat:3.41,lng:-76.54,flujoActual:3.1,flujoNormal:2.2,estado:'Normal',tipo:'flujo',instalado:'2025-02-05'},
{id:'S005',nombre:'Riego cancha multiple',institucion:'I.E. Ciudadela Desepaz',zona:'Comuna 21',lat:3.400,lng:-76.565,flujoActual:7.2,flujoNormal:2.8,estado:'ALERTA',tipo:'riego',instalado:'2025-02-10'},
{id:'S006',nombre:'Cocina restaurante escolar',institucion:'I.E. Santa Librada',zona:'Comuna 3',lat:3.452,lng:-76.531,flujoActual:0.5,flujoNormal:0.6,estado:'Normal',tipo:'cocina',instalado:'2025-02-12'},
{id:'S007',nombre:'Banos bloque B',institucion:'I.E. Normal Superior Santiago de Cali',zona:'Comuna 10',lat:3.4355,lng:-76.5105,flujoActual:2.9,flujoNormal:2.0,estado:'Advertencia',tipo:'flujo',instalado:'2025-02-15'},
{id:'S008',nombre:'Tanque de reserva',institucion:'I.E. Jorge Isaacs',zona:'Comuna 4',lat:3.4405,lng:-76.5195,flujoActual:1.8,flujoNormal:1.9,estado:'Normal',tipo:'tanque',instalado:'2025-02-18'}
];
var zonasFallas = [
{nombre:'I.E. Jorge Isaacs',lat:3.44,lng:-76.519,severidad:4,descripcion:'Comuna 4: sobreconsumo en banos del bloque sur.'},
{nombre:'I.E. Ciudadela Desepaz',lat:3.400,lng:-76.565,severidad:3,descripcion:'Comuna 21: riego de la cancha fuera de horario.'},
{nombre:'I.E. Normal Superior Santiago de Cali',lat:3.47,lng:-76.53,severidad:2,descripcion:'Comuna 10: bebedero con goteo continuo.'},
{nombre:'I.E. Santa Librada',lat:3.4516,lng:-76.532,severidad:1,descripcion:'Comuna 3: consumo dentro de lo normal.'}
];
var comunasData = [
  {comuna:"Comuna 1",barrios:"Terron Colorado, Vista Hermosa, Aguacatal, Palermo",colegios:["I.E. Jose Holguin Garces","I.E. Isaias Gamboa","I.E. Luis Fernando Caicedo"]},
  {comuna:"Comuna 2",barrios:"Chipichape, La Campina, Normandia, La Paz, Vipasa",colegios:["I.E. Santa Cecilia","I.E. Republica del Brasil"]},
  {comuna:"Comuna 3",barrios:"Centro, San Antonio, Santa Rosa, El Calvario, San Pascual",colegios:["I.E. Santa Librada","I.E. Eustaquio Palacios","I.E. Carlos A. Sardi Garces","I.E. Republica de Mexico","I.E. Santiago de Cali","I.E. El Piloto","I.E. Normal Superior Los Farallones","I.E. Manuel Sinisterra Patino","I.E. Maria Perlaza","I.E. Divina Providencia"]},
  {comuna:"Comuna 4",barrios:"Popular, Ignacio Rengifo, La Isla, Marco Fidel Suarez",colegios:["I.E. Fray Domingo de Las Casas","I.E. Camilo Torres","I.E. Guillermo Valencia","I.E. Absalon Fernandez de Soto","I.E. Presbitero Angel Piedrahita","I.E. Veintiuno de Septiembre","I.E. Republica de Israel","I.E. San Jose","I.E. Manuel Santiago Vallecilla","I.E. Santo Tomas (CASD)","I.E. Santo Tomas de Aquino","I.E. Adan Cordovez Cordoba","I.E. Jorge Isaacs","I.E. Manuela Beltran","I.E. Veinte de Julio","I.E. Jose Ignacio Renjifo Salcedo","I.E. Jose Antonio Galan","I.E. Rafael Zamorano","I.E. La Merced","I.E. San Vicente de Paul","I.E. San Pedro Alejandrino"]},
  {comuna:"Comuna 5",barrios:"Metropolitano, Los Andes, Chiminangos, Los Guayacanes",colegios:["I.E. Simon Rodriguez","I.E. Mario Lloreda","I.E. Maria Panesso","I.E. Celmira Bueno de Orejuela","I.E. Mariano Ospina Perez"]},
  {comuna:"Comuna 6",barrios:"Petecuy, Los Guaduales, San Luis II, Floralia",colegios:["I.E. Pedro Antonio Molina","I.E. Tres de Julio","I.E. San Jorge","I.E. Jorge Eliecer Gaitan","I.E. San Luis","I.E. Inmaculada Concepcion","I.E. Atanasio Girardot","I.E. Los Vencedores"]},
  {comuna:"Comuna 7",barrios:"Alfonso Lopez, Siete de Agosto, San Marino, Las Ceibas",colegios:["I.E. Manuel Maria Mallarino","I.E. Los Pinos","I.E. Carlos Holguin Sardi","I.E. Juan Bautista de La Salle","I.E. Vicente Borrero Costa","I.E. Presbitero Eloy Valenzuela","I.E. Carlos Villafane","I.E. Alfonso Lopez Pumarejo","I.E. Jose Maria Villegas","I.E. Siete de Agosto","I.E. Los Farallones","I.E. Rafael Pombo","I.E. Purificacion Trujillo","I.E. Central Provivienda"]},
  {comuna:"Comuna 8",barrios:"Chapinero, Santa Fe, Villa Colombia, El Troncal",colegios:["I.E. Juan de Ampudia","I.E. Once de Noviembre","I.E. Villacolombia","I.E. Santisima Trinidad","I.E. Republica de Colombia","I.E. Las Americas","I.E. Nuestra Senora de Loreto","I.E. Jose Manuel Saavedra Galindo","I.E. Benjamin Herrera","I.E. Nuestra Senora de Fatima","I.E. Alberto Carvajal Borrero","I.E. Abraham Dominguez","I.E. Cacique Guatavita","I.E. Evaristo Garcia","I.E. Jose Hilario Lopez","I.E. Santa Fe","I.E. Ricardo Nieto","I.E. Croydon","I.E. Bajo Palace","I.E. Manual Rebolledo","I.E. Estado de Puerto Rico"]},
  {comuna:"Comuna 9",barrios:"Bretana, Junin, Alameda, Manuel Maria Buenaventura",colegios:["I.E. Republica de Argentina","I.E. Jose Maria Cordoba","I.E. Policarpa Salavarrieta","I.E. Sebastian de Belalcazar","I.E. Antonio Jose Camacho","I.E. Republica del Peru","I.E. Marco Fidel Suarez","I.E. Divino Salvador","I.E. Olga Lucia Lloreda","I.E. Alfredo Vasquez Cobo","I.E. Nuestra Senora de los Remedios","I.E. Republica del Ecuador"]},
  {comuna:"Comuna 10",barrios:"El Guabal, Santo Domingo, Las Acacias, Santa Elena",colegios:["I.E. Normal Superior Santiago de Cali","I.E. Joaquin de Caicedo y Cuero","I.E. Jose Maria Carbonell","I.E. Honorio Villegas","I.E. Isabel de Castilla","I.E. General Carlos Alban","I.E. Rafael Navia Varon","I.E. Panamericana","I.E. Francisco Montes Idrobo","I.E. Jose Maria Vivas Balcazar","I.E. Fernando Velasco","I.E. Carlos Holguin Lloreda","I.E. Santa Elena","I.E. Republica de Costa Rica"]},
  {comuna:"Comuna 11",barrios:"San Carlos, Maracaibo, Prados de Oriente, Jose Holguin",colegios:["I.E. Agustin Nieto Caballero","I.E. Jose Maria Vivas Balcazar","I.E. Marino Rengifo Salcedo","I.E. Boyaca","I.E. Union La Independencia","I.E. Santo Domingo Sabio","I.E. Diez de Mayo","I.E. Republica de Italia","I.E. Villa del Sur","I.E. Susana Vinasco","I.E. Ciudad Modelo","I.E. La Primavera","I.E. Francisco de Paula Santander","I.E. Jose Vicente Concha","I.E. San Pedro Codenal","I.E. Leon XIII","I.E. Julio Arboleda","I.E. Ciudad de Cali","I.E. General Alfredo Vasquez Cobo","I.E. El Recuerdo"]},
  {comuna:"Comuna 12",barrios:"Villanueva, Asturias, Eduardo Santos, El Paraiso",colegios:["I.E. Eva Riascos Plata","I.E. Alfonso Barberena","I.E. Hernando Caicedo","I.E. Hernando Navia Varon","I.E. Satelite Rodrigo Lloreda Caicedo","I.E. Juan XXIII","I.E. Ciudad de Cali","I.E. Nino Jesus de Praga","I.E. Julio Rincon","I.E. San Buenaventura","I.E. Bello Horizonte","I.E. Julio Caicedo y Tellez","I.E. Francisco de Paula Santander","I.E. Batala de Carabobo","I.E. Marice Sinisterra","I.E. Asturias","I.E. Bartolome Loboguerrero"]},
  {comuna:"Comuna 13",barrios:"El Diamante, Los Robles, Calipso, Charco Azul",colegios:["I.E. Enrique Olaya Herrera","I.E. Humberto Jordan Mazuera","I.E. Miguel Camacho Perea","I.E. Villa Blanca","I.E. Charco Azul","I.E. Jesus Villafane Franco","I.E. Omaira Sanchez","I.E. Santa Rosa","I.E. Jose Cardona Hoyos","I.E. Luz Haydee Guerrero","I.E. Rodrigo Lloreda Caicedo","I.E. El Diamante","I.E. Juan Pablo II"]},
  {comuna:"Comuna 14",barrios:"Manuela Beltran, Alfonso Bonilla Aragon, Alirio Mora",colegios:["I.E. Monseñor Ramon Arcila","I.E. Raul Silva Holguin","I.E. Alfonso Reyes Echandia","I.E. La Anunciacion","I.E. Puerta del Sol","I.E. Los Naranjos","I.E. Gabriela Mistral","I.E. Isaias H. Ibarra","I.E. Elias Salazar Garcia"]},
  {comuna:"Comuna 15",barrios:"Ciudad Cordoba, Mojica, El Retiro, Llano Verde",colegios:["I.E. Damaso Zapata","I.E. Gabriel Garcia Marquez","I.E. Jose Ramon Bejarano","I.E. Alfonso Bonilla Naar","I.E. Carlos Holguin Mallarino","I.E. Nino Jesus de Atocha","I.E. Miguel de Pombo","I.E. Ciudad Cordoba","I.E. Enrique Olaya Herrera"]},
  {comuna:"Comuna 16",barrios:"Mariano Ramos, Republica de Israel, La Union",colegios:["I.E. Rodrigo Lloreda Caicedo","I.E. Luis Enrique Montoya","I.E. Micaela Castro Borrero","I.E. Cristobal Colon","I.E. Bienestar Social","I.E. Antonia Santos","I.E. Jose Joaquin Jaramillo","I.E. Donald Rodrigo Tafur","I.E. Francisco J. Ruiz","I.E. Alejandro Montano","I.E. Antonio Nario","I.E. Jose Maria Carbonell","I.E. Libardo Madrid Valderrama","I.E. Angelica Sierra","I.E. Pablo Neruda","I.E. Primero de Mayo","I.E. Carlos Holmes Trujillo","I.E. Policarpa Salavarrieta","I.E. Lizandro Franky","I.E. Cristo Maestro"]},
  {comuna:"Comuna 17",barrios:"El Caney, El Ingenio, Capri, Primero de Mayo",colegios:["I.T.I. Comuna 17","I.E. Luis Carlos Rojas Garces","I.E. Canas Gordas"]},
  {comuna:"Comuna 18",barrios:"Melendez, Los Farallones, Fco. Eladio Ramirez",colegios:["I.E. Alvaro Echeverri Perea","I.E. Luis Eduardo Nieto Caballero","I.E. Eduardo Riascos Grueso","I.E. La Esperanza","I.E. Magdalena Ortega de Nario","I.E. Monseñor Luis Adriano Diaz","I.E. Juan Pablo I","I.E. Portete de Tarqui","I.E. Templo del Saber","I.E. Alvaro Escobar Navia","I.E. Veinticinco de Julio","I.E. General Santander","I.E. Celimo Rueda","I.E. John F. Kennedy","I.E. Buenos Aires"]},
  {comuna:"Comuna 19",barrios:"San Fernando, Tequendama, Bellavista, Miraflores",colegios:["I.E. Liceo Departamental","I.E. La Presentacion","I.E. La Gran Colombia","I.E. Politecnico Municipal de Cali","I.E. Eustaquio Palacios","I.E. General Anzoategui","I.E. Instituto Oscar Scarpetta","I.E. Juana de Caicedo y Cuero"]},
  {comuna:"Comuna 20",barrios:"Siloe, Lleras Camargo, Brisas de Mayo",colegios:["I.E. Celanese","I.E. Luis Lopez de Meza","I.E. Sofia Camargo de Lleras","I.E. Santiago Rengifo Salcedo","I.E. Fray Cristobal de Torres","I.E. Mariscal Jorge Robledo","I.E. Miguel Antonio Caro","I.E. Manuel Maria Buenaventura","I.E. Antonia Santos","I.E. Simon Bolivar","I.E. Multiproposito","I.E. Jorge Eliecer Gonzalez Rubio","I.E. Luis Alberto Rosales","I.E. Republica de Panama"]},
  {comuna:"Comuna 21",barrios:"Desepaz, Talanga, Compartir, Pizamos, Remansos",colegios:["I.E. Ciudadela Desepaz","I.E. Puerta del Sol IV y V"]},
];
var TOTAL_IEO = comunasData.reduce(function(a,c){return a+c.colegios.length;},0);
var institucionesData = [
{nombre:'I.E. Jose Holguin Garces',sede:'Sede principal - Comuna 1',comuna:'Comuna 1',sensores:1,ahorro:14557,estado:'Optimo'},
{nombre:'I.E. Isaias Gamboa',sede:'Sede principal - Comuna 1',comuna:'Comuna 1',sensores:2,ahorro:10770,estado:'Optimo'},
{nombre:'I.E. Luis Fernando Caicedo',sede:'Sede principal - Comuna 1',comuna:'Comuna 1',sensores:3,ahorro:11631,estado:'Optimo'},
{nombre:'I.E. Santa Cecilia',sede:'Sede principal - Comuna 2',comuna:'Comuna 2',sensores:2,ahorro:10070,estado:'Optimo'},
{nombre:'I.E. Republica del Brasil',sede:'Sede principal - Comuna 2',comuna:'Comuna 2',sensores:2,ahorro:9300,estado:'Optimo'},
{nombre:'I.E. Santa Librada',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:2,ahorro:7305,estado:'Optimo'},
{nombre:'I.E. Eustaquio Palacios',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:2,ahorro:1579,estado:'En revision'},
{nombre:'I.E. Carlos A. Sardi Garces',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:2,ahorro:10826,estado:'Proxima'},
{nombre:'I.E. Republica de Mexico',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:2,ahorro:3350,estado:'Optimo'},
{nombre:'I.E. Santiago de Cali',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:1,ahorro:11379,estado:'En revision'},
{nombre:'I.E. El Piloto',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:1,ahorro:6871,estado:'Optimo'},
{nombre:'I.E. Normal Superior Los Farallones',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:1,ahorro:8572,estado:'En revision'},
{nombre:'I.E. Manuel Sinisterra Patino',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:3,ahorro:4302,estado:'En revision'},
{nombre:'I.E. Maria Perlaza',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:1,ahorro:4848,estado:'Optimo'},
{nombre:'I.E. Divina Providencia',sede:'Sede principal - Comuna 3',comuna:'Comuna 3',sensores:2,ahorro:5856,estado:'Proxima'},
{nombre:'I.E. Fray Domingo de Las Casas',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:7340,estado:'Optimo'},
{nombre:'I.E. Camilo Torres',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:9307,estado:'Optimo'},
{nombre:'I.E. Guillermo Valencia',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:3714,estado:'Optimo'},
{nombre:'I.E. Absalon Fernandez de Soto',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:8460,estado:'Optimo'},
{nombre:'I.E. Presbitero Angel Piedrahita',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:1,ahorro:5856,estado:'Proxima'},
{nombre:'I.E. Veintiuno de Septiembre',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:1,ahorro:6353,estado:'Proxima'},
{nombre:'I.E. Republica de Israel',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:1,ahorro:5555,estado:'Optimo'},
{nombre:'I.E. San Jose',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:12002,estado:'En revision'},
{nombre:'I.E. Manuel Santiago Vallecilla',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:9482,estado:'En revision'},
{nombre:'I.E. Santo Tomas (CASD)',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:1558,estado:'Optimo'},
{nombre:'I.E. Santo Tomas de Aquino',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:10588,estado:'Optimo'},
{nombre:'I.E. Adan Cordovez Cordoba',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:13997,estado:'Optimo'},
{nombre:'I.E. Jorge Isaacs',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:1,ahorro:3098,estado:'Optimo'},
{nombre:'I.E. Manuela Beltran',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:1,ahorro:5548,estado:'Optimo'},
{nombre:'I.E. Veinte de Julio',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:4204,estado:'Optimo'},
{nombre:'I.E. Jose Ignacio Renjifo Salcedo',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:6668,estado:'Optimo'},
{nombre:'I.E. Jose Antonio Galan',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:11743,estado:'Proxima'},
{nombre:'I.E. Rafael Zamorano',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:5807,estado:'Optimo'},
{nombre:'I.E. La Merced',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:7340,estado:'Optimo'},
{nombre:'I.E. San Vicente de Paul',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:2,ahorro:3630,estado:'Optimo'},
{nombre:'I.E. San Pedro Alejandrino',sede:'Sede principal - Comuna 4',comuna:'Comuna 4',sensores:3,ahorro:13780,estado:'Optimo'},
{nombre:'I.E. Simon Rodriguez',sede:'Sede principal - Comuna 5',comuna:'Comuna 5',sensores:3,ahorro:9496,estado:'Proxima'},
{nombre:'I.E. Mario Lloreda',sede:'Sede principal - Comuna 5',comuna:'Comuna 5',sensores:1,ahorro:10812,estado:'En revision'},
{nombre:'I.E. Maria Panesso',sede:'Sede principal - Comuna 5',comuna:'Comuna 5',sensores:1,ahorro:3938,estado:'Optimo'},
{nombre:'I.E. Celmira Bueno de Orejuela',sede:'Sede principal - Comuna 5',comuna:'Comuna 5',sensores:1,ahorro:9363,estado:'Proxima'},
{nombre:'I.E. Mariano Ospina Perez',sede:'Sede principal - Comuna 5',comuna:'Comuna 5',sensores:3,ahorro:9678,estado:'Optimo'},
{nombre:'I.E. Pedro Antonio Molina',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:1,ahorro:6423,estado:'Proxima'},
{nombre:'I.E. Tres de Julio',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:2,ahorro:3819,estado:'En revision'},
{nombre:'I.E. San Jorge',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:3,ahorro:3476,estado:'Proxima'},
{nombre:'I.E. Jorge Eliecer Gaitan',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:1,ahorro:13591,estado:'Optimo'},
{nombre:'I.E. San Luis',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:3,ahorro:5366,estado:'Proxima'},
{nombre:'I.E. Inmaculada Concepcion',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:2,ahorro:6339,estado:'En revision'},
{nombre:'I.E. Atanasio Girardot',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:3,ahorro:1943,estado:'Proxima'},
{nombre:'I.E. Los Vencedores',sede:'Sede principal - Comuna 6',comuna:'Comuna 6',sensores:3,ahorro:3805,estado:'Optimo'},
{nombre:'I.E. Manuel Maria Mallarino',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:11708,estado:'Optimo'},
{nombre:'I.E. Los Pinos',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:8166,estado:'Proxima'},
{nombre:'I.E. Carlos Holguin Sardi',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:11708,estado:'Optimo'},
{nombre:'I.E. Juan Bautista de La Salle',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:3343,estado:'Proxima'},
{nombre:'I.E. Vicente Borrero Costa',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:3,ahorro:5884,estado:'Optimo'},
{nombre:'I.E. Presbitero Eloy Valenzuela',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:6976,estado:'Proxima'},
{nombre:'I.E. Carlos Villafane',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:11477,estado:'Optimo'},
{nombre:'I.E. Alfonso Lopez Pumarejo',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:7312,estado:'En revision'},
{nombre:'I.E. Jose Maria Villegas',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:2,ahorro:1117,estado:'Optimo'},
{nombre:'I.E. Siete de Agosto',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:2,ahorro:1075,estado:'Optimo'},
{nombre:'I.E. Los Farallones',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:10546,estado:'Proxima'},
{nombre:'I.E. Rafael Pombo',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:7557,estado:'Optimo'},
{nombre:'I.E. Purificacion Trujillo',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:2664,estado:'Optimo'},
{nombre:'I.E. Central Provivienda',sede:'Sede principal - Comuna 7',comuna:'Comuna 7',sensores:1,ahorro:14809,estado:'En revision'},
{nombre:'I.E. Juan de Ampudia',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:1747,estado:'Optimo'},
{nombre:'I.E. Once de Noviembre',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:6934,estado:'Optimo'},
{nombre:'I.E. Villacolombia',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:11645,estado:'Optimo'},
{nombre:'I.E. Santisima Trinidad',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:1,ahorro:3679,estado:'En revision'},
{nombre:'I.E. Republica de Colombia',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:1831,estado:'Optimo'},
{nombre:'I.E. Las Americas',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:11106,estado:'Proxima'},
{nombre:'I.E. Nuestra Senora de Loreto',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:10301,estado:'Optimo'},
{nombre:'I.E. Jose Manuel Saavedra Galindo',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:7193,estado:'Proxima'},
{nombre:'I.E. Benjamin Herrera',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:5954,estado:'Optimo'},
{nombre:'I.E. Nuestra Senora de Fatima',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:3266,estado:'Proxima'},
{nombre:'I.E. Alberto Carvajal Borrero',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:14165,estado:'Optimo'},
{nombre:'I.E. Abraham Dominguez',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:8985,estado:'Optimo'},
{nombre:'I.E. Cacique Guatavita',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:1,ahorro:12226,estado:'Proxima'},
{nombre:'I.E. Evaristo Garcia',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:7851,estado:'Optimo'},
{nombre:'I.E. Jose Hilario Lopez',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:1,ahorro:3294,estado:'Optimo'},
{nombre:'I.E. Santa Fe',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:9503,estado:'Proxima'},
{nombre:'I.E. Ricardo Nieto',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:7298,estado:'Optimo'},
{nombre:'I.E. Croydon',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:7949,estado:'En revision'},
{nombre:'I.E. Bajo Palace',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:2,ahorro:9139,estado:'En revision'},
{nombre:'I.E. Manual Rebolledo',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:5947,estado:'Optimo'},
{nombre:'I.E. Estado de Puerto Rico',sede:'Sede principal - Comuna 8',comuna:'Comuna 8',sensores:3,ahorro:7438,estado:'Optimo'},
{nombre:'I.E. Republica de Argentina',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:14326,estado:'Proxima'},
{nombre:'I.E. Jose Maria Cordoba',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:2,ahorro:1292,estado:'En revision'},
{nombre:'I.E. Policarpa Salavarrieta',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:2,ahorro:8355,estado:'Optimo'},
{nombre:'I.E. Sebastian de Belalcazar',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:6283,estado:'Proxima'},
{nombre:'I.E. Antonio Jose Camacho',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:2,ahorro:3910,estado:'Optimo'},
{nombre:'I.E. Republica del Peru',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:5289,estado:'En revision'},
{nombre:'I.E. Marco Fidel Suarez',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:9531,estado:'Optimo'},
{nombre:'I.E. Divino Salvador',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:2090,estado:'Optimo'},
{nombre:'I.E. Olga Lucia Lloreda',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:3,ahorro:14585,estado:'Optimo'},
{nombre:'I.E. Alfredo Vasquez Cobo',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:10602,estado:'En revision'},
{nombre:'I.E. Nuestra Senora de los Remedios',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:1,ahorro:11218,estado:'Optimo'},
{nombre:'I.E. Republica del Ecuador',sede:'Sede principal - Comuna 9',comuna:'Comuna 9',sensores:2,ahorro:4834,estado:'Optimo'},
{nombre:'I.E. Normal Superior Santiago de Cali',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:4365,estado:'Optimo'},
{nombre:'I.E. Joaquin de Caicedo y Cuero',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:3,ahorro:8460,estado:'Optimo'},
{nombre:'I.E. Jose Maria Carbonell',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:2,ahorro:6164,estado:'Optimo'},
{nombre:'I.E. Honorio Villegas',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:11554,estado:'Optimo'},
{nombre:'I.E. Isabel de Castilla',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:2,ahorro:8761,estado:'Optimo'},
{nombre:'I.E. General Carlos Alban',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:7193,estado:'Proxima'},
{nombre:'I.E. Rafael Navia Varon',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:2,ahorro:3119,estado:'En revision'},
{nombre:'I.E. Panamericana',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:11533,estado:'Proxima'},
{nombre:'I.E. Francisco Montes Idrobo',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:2,ahorro:13808,estado:'Optimo'},
{nombre:'I.E. Jose Maria Vivas Balcazar',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:14697,estado:'Optimo'},
{nombre:'I.E. Fernando Velasco',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:1,ahorro:13395,estado:'Optimo'},
{nombre:'I.E. Carlos Holguin Lloreda',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:3,ahorro:4694,estado:'Optimo'},
{nombre:'I.E. Santa Elena',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:3,ahorro:5961,estado:'Optimo'},
{nombre:'I.E. Republica de Costa Rica',sede:'Sede principal - Comuna 10',comuna:'Comuna 10',sensores:3,ahorro:4106,estado:'Proxima'},
{nombre:'I.E. Agustin Nieto Caballero',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:6080,estado:'Optimo'},
{nombre:'I.E. Jose Maria Vivas Balcazar',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:14697,estado:'Optimo'},
{nombre:'I.E. Marino Rengifo Salcedo',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:3,ahorro:12268,estado:'Optimo'},
{nombre:'I.E. Boyaca',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:3,ahorro:10518,estado:'Optimo'},
{nombre:'I.E. Union La Independencia',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:6290,estado:'Optimo'},
{nombre:'I.E. Santo Domingo Sabio',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:9475,estado:'Optimo'},
{nombre:'I.E. Diez de Mayo',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:5590,estado:'Optimo'},
{nombre:'I.E. Republica de Italia',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:3,ahorro:3861,estado:'Optimo'},
{nombre:'I.E. Villa del Sur',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:8278,estado:'Optimo'},
{nombre:'I.E. Susana Vinasco',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:5429,estado:'En revision'},
{nombre:'I.E. Ciudad Modelo',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:3833,estado:'Proxima'},
{nombre:'I.E. La Primavera',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:5891,estado:'Optimo'},
{nombre:'I.E. Francisco de Paula Santander',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:3399,estado:'En revision'},
{nombre:'I.E. Jose Vicente Concha',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:3238,estado:'Optimo'},
{nombre:'I.E. San Pedro Codenal',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:3,ahorro:7039,estado:'En revision'},
{nombre:'I.E. Leon XIII',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:6150,estado:'Optimo'},
{nombre:'I.E. Julio Arboleda',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:3,ahorro:10588,estado:'Optimo'},
{nombre:'I.E. Ciudad de Cali',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:1,ahorro:9727,estado:'Optimo'},
{nombre:'I.E. General Alfredo Vasquez Cobo',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:3490,estado:'Optimo'},
{nombre:'I.E. El Recuerdo',sede:'Sede principal - Comuna 11',comuna:'Comuna 11',sensores:2,ahorro:9489,estado:'En revision'},
{nombre:'I.E. Eva Riascos Plata',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:11351,estado:'Optimo'},
{nombre:'I.E. Alfonso Barberena',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:8005,estado:'Optimo'},
{nombre:'I.E. Hernando Caicedo',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:6080,estado:'Optimo'},
{nombre:'I.E. Hernando Navia Varon',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:11855,estado:'Optimo'},
{nombre:'I.E. Satelite Rodrigo Lloreda Caicedo',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:1,ahorro:2503,estado:'Proxima'},
{nombre:'I.E. Juan XXIII',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:3336,estado:'Proxima'},
{nombre:'I.E. Ciudad de Cali',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:1,ahorro:9727,estado:'Optimo'},
{nombre:'I.E. Nino Jesus de Praga',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:7039,estado:'En revision'},
{nombre:'I.E. Julio Rincon',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:13549,estado:'En revision'},
{nombre:'I.E. San Buenaventura',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:12583,estado:'Proxima'},
{nombre:'I.E. Bello Horizonte',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:5247,estado:'Optimo'},
{nombre:'I.E. Julio Caicedo y Tellez',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:7123,estado:'Proxima'},
{nombre:'I.E. Francisco de Paula Santander',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:3399,estado:'En revision'},
{nombre:'I.E. Batala de Carabobo',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:1,ahorro:12114,estado:'Optimo'},
{nombre:'I.E. Marice Sinisterra',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:2,ahorro:13486,estado:'Proxima'},
{nombre:'I.E. Asturias',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:10469,estado:'En revision'},
{nombre:'I.E. Bartolome Loboguerrero',sede:'Sede principal - Comuna 12',comuna:'Comuna 12',sensores:3,ahorro:7823,estado:'Proxima'},
{nombre:'I.E. Enrique Olaya Herrera',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:1,ahorro:10147,estado:'Optimo'},
{nombre:'I.E. Humberto Jordan Mazuera',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:13472,estado:'En revision'},
{nombre:'I.E. Miguel Camacho Perea',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:10175,estado:'Optimo'},
{nombre:'I.E. Villa Blanca',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:14802,estado:'En revision'},
{nombre:'I.E. Charco Azul',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:8313,estado:'Proxima'},
{nombre:'I.E. Jesus Villafane Franco',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:3,ahorro:2538,estado:'Optimo'},
{nombre:'I.E. Omaira Sanchez',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:9034,estado:'Optimo'},
{nombre:'I.E. Santa Rosa',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:1,ahorro:13731,estado:'Optimo'},
{nombre:'I.E. Jose Cardona Hoyos',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:3,ahorro:9818,estado:'Optimo'},
{nombre:'I.E. Luz Haydee Guerrero',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:3,ahorro:7599,estado:'En revision'},
{nombre:'I.E. Rodrigo Lloreda Caicedo',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:3,ahorro:1810,estado:'Optimo'},
{nombre:'I.E. El Diamante',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:3,ahorro:10735,estado:'Optimo'},
{nombre:'I.E. Juan Pablo II',sede:'Sede principal - Comuna 13',comuna:'Comuna 13',sensores:2,ahorro:5555,estado:'Optimo'},
{nombre:'I.E. Monseñor Ramon Arcila',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:1,ahorro:1558,estado:'Optimo'},
{nombre:'I.E. Raul Silva Holguin',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:2,ahorro:4666,estado:'Proxima'},
{nombre:'I.E. Alfonso Reyes Echandia',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:1,ahorro:2510,estado:'Optimo'},
{nombre:'I.E. La Anunciacion',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:1,ahorro:5002,estado:'En revision'},
{nombre:'I.E. Puerta del Sol',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:2,ahorro:14711,estado:'Optimo'},
{nombre:'I.E. Los Naranjos',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:3,ahorro:9055,estado:'Optimo'},
{nombre:'I.E. Gabriela Mistral',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:3,ahorro:13486,estado:'Proxima'},
{nombre:'I.E. Isaias H. Ibarra',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:2,ahorro:2930,estado:'Optimo'},
{nombre:'I.E. Elias Salazar Garcia',sede:'Sede principal - Comuna 14',comuna:'Comuna 14',sensores:3,ahorro:13794,estado:'Optimo'},
{nombre:'I.E. Damaso Zapata',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:1,ahorro:13647,estado:'Optimo'},
{nombre:'I.E. Gabriel Garcia Marquez',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:1,ahorro:3805,estado:'Optimo'},
{nombre:'I.E. Jose Ramon Bejarano',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:2,ahorro:2993,estado:'Proxima'},
{nombre:'I.E. Alfonso Bonilla Naar',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:1,ahorro:2580,estado:'Optimo'},
{nombre:'I.E. Carlos Holguin Mallarino',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:1,ahorro:10224,estado:'Optimo'},
{nombre:'I.E. Nino Jesus de Atocha',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:2,ahorro:4456,estado:'Proxima'},
{nombre:'I.E. Miguel de Pombo',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:3,ahorro:1236,estado:'Proxima'},
{nombre:'I.E. Ciudad Cordoba',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:3,ahorro:2713,estado:'Proxima'},
{nombre:'I.E. Enrique Olaya Herrera',sede:'Sede principal - Comuna 15',comuna:'Comuna 15',sensores:1,ahorro:10147,estado:'Optimo'},
{nombre:'I.E. Rodrigo Lloreda Caicedo',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:1810,estado:'Optimo'},
{nombre:'I.E. Luis Enrique Montoya',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:11414,estado:'Optimo'},
{nombre:'I.E. Micaela Castro Borrero',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:10504,estado:'Optimo'},
{nombre:'I.E. Cristobal Colon',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:2671,estado:'Optimo'},
{nombre:'I.E. Bienestar Social',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:11771,estado:'Optimo'},
{nombre:'I.E. Antonia Santos',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:9447,estado:'Optimo'},
{nombre:'I.E. Jose Joaquin Jaramillo',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:8656,estado:'Proxima'},
{nombre:'I.E. Donald Rodrigo Tafur',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:1327,estado:'Optimo'},
{nombre:'I.E. Francisco J. Ruiz',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:7431,estado:'Optimo'},
{nombre:'I.E. Alejandro Montano',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:6073,estado:'Proxima'},
{nombre:'I.E. Antonio Nario',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:6206,estado:'Proxima'},
{nombre:'I.E. Jose Maria Carbonell',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:6164,estado:'Optimo'},
{nombre:'I.E. Libardo Madrid Valderrama',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:7368,estado:'Optimo'},
{nombre:'I.E. Angelica Sierra',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:13339,estado:'En revision'},
{nombre:'I.E. Pablo Neruda',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:1,ahorro:13542,estado:'En revision'},
{nombre:'I.E. Primero de Mayo',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:4666,estado:'Proxima'},
{nombre:'I.E. Carlos Holmes Trujillo',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:2986,estado:'Proxima'},
{nombre:'I.E. Policarpa Salavarrieta',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:2,ahorro:8355,estado:'Optimo'},
{nombre:'I.E. Lizandro Franky',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:10903,estado:'Proxima'},
{nombre:'I.E. Cristo Maestro',sede:'Sede principal - Comuna 16',comuna:'Comuna 16',sensores:3,ahorro:13878,estado:'Optimo'},
{nombre:'I.T.I. Comuna 17',sede:'Sede principal - Comuna 17',comuna:'Comuna 17',sensores:1,ahorro:3098,estado:'Optimo'},
{nombre:'I.E. Luis Carlos Rojas Garces',sede:'Sede principal - Comuna 17',comuna:'Comuna 17',sensores:2,ahorro:11624,estado:'Optimo'},
{nombre:'I.E. Canas Gordas',sede:'Sede principal - Comuna 17',comuna:'Comuna 17',sensores:2,ahorro:3623,estado:'Proxima'},
{nombre:'I.E. Alvaro Echeverri Perea',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:4526,estado:'Proxima'},
{nombre:'I.E. Luis Eduardo Nieto Caballero',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:2314,estado:'Optimo'},
{nombre:'I.E. Eduardo Riascos Grueso',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:5506,estado:'Proxima'},
{nombre:'I.E. La Esperanza',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:5625,estado:'Optimo'},
{nombre:'I.E. Magdalena Ortega de Nario',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:1,ahorro:8355,estado:'Optimo'},
{nombre:'I.E. Monseñor Luis Adriano Diaz',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:9552,estado:'En revision'},
{nombre:'I.E. Juan Pablo I',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:12324,estado:'Optimo'},
{nombre:'I.E. Portete de Tarqui',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:8019,estado:'En revision'},
{nombre:'I.E. Templo del Saber',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:8278,estado:'Optimo'},
{nombre:'I.E. Alvaro Escobar Navia',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:9426,estado:'Proxima'},
{nombre:'I.E. Veinticinco de Julio',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:1,ahorro:9020,estado:'Optimo'},
{nombre:'I.E. General Santander',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:1,ahorro:5135,estado:'Optimo'},
{nombre:'I.E. Celimo Rueda',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:2,ahorro:10161,estado:'Optimo'},
{nombre:'I.E. John F. Kennedy',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:3490,estado:'Optimo'},
{nombre:'I.E. Buenos Aires',sede:'Sede principal - Comuna 18',comuna:'Comuna 18',sensores:3,ahorro:14585,estado:'Optimo'},
{nombre:'I.E. Liceo Departamental',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:3,ahorro:7921,estado:'Optimo'},
{nombre:'I.E. La Presentacion',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:1,ahorro:10609,estado:'En revision'},
{nombre:'I.E. La Gran Colombia',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:3,ahorro:11456,estado:'Proxima'},
{nombre:'I.E. Politecnico Municipal de Cali',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:1,ahorro:3014,estado:'Optimo'},
{nombre:'I.E. Eustaquio Palacios',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:2,ahorro:1579,estado:'En revision'},
{nombre:'I.E. General Anzoategui',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:2,ahorro:10518,estado:'Optimo'},
{nombre:'I.E. Instituto Oscar Scarpetta',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:3,ahorro:6605,estado:'Optimo'},
{nombre:'I.E. Juana de Caicedo y Cuero',sede:'Sede principal - Comuna 19',comuna:'Comuna 19',sensores:2,ahorro:5856,estado:'Proxima'},
{nombre:'I.E. Celanese',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:3,ahorro:14641,estado:'Optimo'},
{nombre:'I.E. Luis Lopez de Meza',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:1,ahorro:4694,estado:'Optimo'},
{nombre:'I.E. Sofia Camargo de Lleras',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:1,ahorro:13759,estado:'En revision'},
{nombre:'I.E. Santiago Rengifo Salcedo',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:3,ahorro:2804,estado:'Optimo'},
{nombre:'I.E. Fray Cristobal de Torres',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:3,ahorro:2244,estado:'Optimo'},
{nombre:'I.E. Mariscal Jorge Robledo',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:2,ahorro:6871,estado:'Optimo'},
{nombre:'I.E. Miguel Antonio Caro',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:2,ahorro:7865,estado:'Optimo'},
{nombre:'I.E. Manuel Maria Buenaventura',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:2,ahorro:11477,estado:'Optimo'},
{nombre:'I.E. Antonia Santos',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:3,ahorro:9447,estado:'Optimo'},
{nombre:'I.E. Simon Bolivar',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:2,ahorro:10924,estado:'Optimo'},
{nombre:'I.E. Multiproposito',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:3,ahorro:5261,estado:'Optimo'},
{nombre:'I.E. Jorge Eliecer Gonzalez Rubio',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:1,ahorro:2328,estado:'Optimo'},
{nombre:'I.E. Luis Alberto Rosales',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:2,ahorro:4904,estado:'Optimo'},
{nombre:'I.E. Republica de Panama',sede:'Sede principal - Comuna 20',comuna:'Comuna 20',sensores:1,ahorro:3819,estado:'En revision'},
{nombre:'I.E. Ciudadela Desepaz',sede:'Sede principal - Comuna 21',comuna:'Comuna 21',sensores:1,ahorro:13871,estado:'Optimo'},
{nombre:'I.E. Puerta del Sol IV y V',sede:'Sede principal - Comuna 21',comuna:'Comuna 21',sensores:3,ahorro:2965,estado:'Optimo'}
];
var alertasData = [
{id:'A001',sensor:'S002',tipo:'Fuga probable',descripcion:'Bateria de banos del INEM con flujo 2.3x el normal. Posible cisterna abierta.',hora:'2025-03-15 09:23',zona:'Comuna 10',gravedad:'ALTA',estado:'Nuevo'},
{id:'A002',sensor:'S005',tipo:'Sobreconsumo',descripcion:'Riego de la cancha de Ciudadela Desepaz activo fuera del horario permitido.',hora:'2025-03-15 10:05',zona:'Comuna 21',gravedad:'MEDIA',estado:'En revision'},
{id:'A003',sensor:'S007',tipo:'Goteo continuo',descripcion:'Banos del bloque B con flujo elevado durante la noche.',hora:'2025-03-15 11:30',zona:'Comuna 2',gravedad:'MEDIA',estado:'Nuevo'}
];
var reportesData = [
{id:'R001',tipo:'fuga',direccion:'I.E. Santa Librada, Calle 6 14-56',descripcion:'Llave del bano de ninas del segundo piso goteando todo el dia.',telefono:'300 123 4567',fecha:'2025-03-14 14:20',estado:'Abierto',imagen:null},
{id:'R002',tipo:'presion',direccion:'INEM Jorge Isaacs, Cra 52 2-51',descripcion:'Sin agua en los banos del bloque sur desde las 8 a.m.',telefono:'310 987 6543',fecha:'2025-03-14 16:45',estado:'En revision',imagen:null},
{id:'R003',tipo:'bebedero',direccion:'I.E. Normal Superior, Av 3N 46-45',descripcion:'Bebedero del patio con boton pegado, sale agua sin parar.',telefono:'',fecha:'2025-03-15 08:10',estado:'Nuevo',imagen:null}
];
var misionesData = [
{id:'M1',titulo:'Patrulla anti-fugas',desc:'Revisa con tu curso todas las llaves de tu bloque e informa goteos.',puntos:50,done:false},
{id:'M2',titulo:'Bebedero vigilado',desc:'Adopta el bebedero de tu patio y reporta si gotea por una semana.',puntos:30,done:false},
{id:'M3',titulo:'Ducha consciente',desc:'En casa, duchate en menos de 5 minutos durante 5 dias seguidos.',puntos:40,done:false},
{id:'M4',titulo:'Guardianes del tanque',desc:'Acompana al personal de mantenimiento a revisar el tanque de tu sede.',puntos:60,done:false},
{id:'M5',titulo:'Reportero del agua',desc:'Envia tu primer reporte con foto en la plataforma Aqua Max.',puntos:25,done:false}
];
var imagenReporte = null;
var charts = {};
function $(id){return document.getElementById(id);}
var TIPO_LABEL = {fuga:'Fuga de agua',presion:'Sin agua / presion',calidad:'Calidad del agua',bebedero:'Bebedero',tanque:'Tanque',otro:'Otro'};
function actualizarReloj(){var el = $('reloj');if(!el){return;}el.textContent = new Date().toLocaleTimeString('es-CO',{hour12:false});}
function actualizarStats(){
if($('stat-sensores')){$('stat-sensores').textContent = sensoresData.length;}
if($('stat-alertas')){$('stat-alertas').textContent = alertasData.filter(function(a){return a.estado==='Nuevo';}).length;}
if($('stat-reportes')){$('stat-reportes').textContent = reportesData.length;}
var total = institucionesData.reduce(function(s,i){return s+i.ahorro;},0);
if($('stat-ahorro')){$('stat-ahorro').textContent = total>=1000 ? (total/1000).toFixed(1)+'k' : String(total);}
}
function estadoClase(e){if(e==='ALERTA'){return 'ALERTA';}if(e==='Advertencia'){return 'Advertencia';}return 'NORMAL';}
function renderizarSensores(){
var g = $('sensors-grid');if(!g){return;}
var html = sensoresData.map(function(s){
var c = estadoClase(s.estado);
var dot = s.estado==='ALERTA' ? 'ALERTA' : (s.estado==='Advertencia' ? 'Advertencia' : 'Activo');
return '<div class="sensor-card '+c+'"><div class="sensor-card-header"><div><div class="sensor-name">'+s.nombre+'</div><div class="sensor-location">'+s.institucion+' - '+s.zona+'</div></div><span class="sensor-badge '+dot+'">'+s.estado+'</span></div><div class="sensor-value">'+s.flujoActual.toFixed(1)+'<span class="unit">L/s</span></div><div class="sensor-status-row"><span><span class="status-dot-sm '+dot+'"></span>'+s.tipo+' - ID '+s.id+'</span><span>Normal: '+s.flujoNormal.toFixed(1)+' L/s</span></div></div>';
}).join('');
g.innerHTML = html;
}
function renderizarAlertas(){
var l = $('alertas-list');if(!l){return;}
if(!alertasData.length){l.innerHTML = '<p class="empty-message">No hay alertas activas. Todo en orden.</p>';return;}
l.innerHTML = alertasData.map(function(a){
var cls = a.gravedad==='ALTA' ? 'alerta-roja' : (a.gravedad==='MEDIA' ? 'alerta-amarilla' : '');
return '<div class="alerta-item '+cls+'"><span class="alerta-icon"><span class="ico ico-alert"></span></span><div class="alerta-content"><div class="alerta-title">'+a.tipo+' - '+a.zona+'</div><div class="alerta-desc">'+a.descripcion+'</div></div><span class="alerta-time">'+a.hora.slice(11)+'</span></div>';
}).join('');
}
function renderizarAlertasAutomaticas(){
var c = $('alertas-auto-list');if(!c){return;}
var items = sensoresData.filter(function(s){return s.estado!=='Normal';});
if(!items.length){c.innerHTML = '<p class="empty-message">Sin detecciones automaticas por ahora.</p>';return;}
c.innerHTML = items.map(function(s){
var t = s.estado==='ALERTA' ? 'urgente' : 'info';
return '<div class="alerta-auto-item '+t+'"><span class="alerta-auto-icon"><span class="ico ico-alert"></span></span><div class="alerta-auto-text"><strong>'+s.id+'</strong> - '+s.nombre+' ('+s.institucion+') - flujo '+s.flujoActual.toFixed(1)+' L/s vs '+s.flujoNormal.toFixed(1)+' normal.<small>Sensor - '+s.zona+'</small></div></div>';
}).join('');
}
function renderizarDiag(){
var g = $('diag-grid');if(!g){return;}
var fugas = sensoresData.filter(function(s){return s.estado==='ALERTA';}).length;
var rev = sensoresData.filter(function(s){return s.estado==='Advertencia';}).length;
var total = institucionesData.reduce(function(s,i){return s+i.ahorro;},0);
var cards = [
{t:'Fugas activas',v:String(fugas),sub:'puntos criticos en colegios',pct:Math.min(100,fugas*34),cls:fugas?'bad':'ok'},
{t:'Puntos en revision',v:String(rev),sub:'requieren visita tecnica',pct:Math.min(100,rev*50+10),cls:rev?'warn':'ok'},
{t:'Calidad del agua',v:'98%',sub:'muestras dentro de norma',pct:98,cls:'ok'},
{t:'Ahorro acumulado',v:(total/1000).toFixed(1)+'k L',sub:'entre las sedes vinculadas',pct:72,cls:''}
];
g.innerHTML = cards.map(function(c){
return '<div class="diag-card"><h4><span class="ico ico-search"></span>'+c.t+'</h4><div class="diag-value">'+c.v+'</div><div class="diag-sub">'+c.sub+'</div><div class="diag-bar"><span class="diag-fill '+c.cls+'" style="width:'+c.pct+'%"></span></div></div>';
}).join('');
}
function renderizarAdmin(){
var b = $('admin-tabla-body');
var total = institucionesData.reduce(function(s,i){return s+i.ahorro;},0);
if($('admin-count')){$('admin-count').textContent = institucionesData.length+' sedes';}
var ac = $('admin-cards');
if(ac){ac.innerHTML = '<div class="admin-card"><strong>'+institucionesData.length+'</strong><span>Instituciones</span></div><div class="admin-card"><strong>'+sensoresData.length+'</strong><span>Sensores instalados</span></div><div class="admin-card"><strong>'+total.toLocaleString('es-CO')+'</strong><span>Litros ahorrados</span></div>';}
if(!b){return;}
function tag(e){if(e==='Optimo'){return 'optimo';}if(e==='En revision'){return 'revision';}return 'proxima';}
b.innerHTML = institucionesData.map(function(i){
return '<tr><td><strong>'+i.nombre+'</strong></td><td>'+i.sede+'</td><td>'+i.sensores+'</td><td>'+i.ahorro.toLocaleString('es-CO')+'</td><td><span class="estado-tag '+tag(i.estado)+'">'+i.estado+'</span></td></tr>';
}).join('');
}
function renderizarMisiones(){
var l = $('misiones-list');if(!l){return;}
var hechas = misionesData.filter(function(m){return m.done;}).length;
if($('misiones-progreso')){$('misiones-progreso').textContent = hechas+'/'+misionesData.length;}
l.innerHTML = misionesData.map(function(m){
return '<div class="mision-item '+(m.done?'done':'')+'" data-mision="'+m.id+'"><span class="mcheck"></span><div><h4>'+m.titulo+'</h4><p>'+m.desc+'</p></div><span class="mision-pts">+'+m.puntos+' pts</span></div>';
}).join('');
var items = l.querySelectorAll('.mision-item');
items.forEach(function(el){el.addEventListener('click',function(){toggleMision(el.getAttribute('data-mision'));});});
}
function toggleMision(id){
var m = null;
for(var i=0;i<misionesData.length;i++){if(misionesData[i].id===id){m=misionesData[i];}}
if(!m){return;}
m.done = !m.done;renderizarMisiones();
mostrarToast(m.done?'Mision completada':'Mision pendiente', m.titulo+(m.done?' (+'+m.puntos+' pts)':''), m.done?'exito':'error');
}
function renderizarReportes(){
var l = $('reportes-list');if(!l){return;}
if(!reportesData.length){l.innerHTML = '<p class="empty-message">Aun no hay reportes. Se la primera persona en reportar.</p>';return;}
l.innerHTML = reportesData.map(function(r){
var img = r.imagen ? '<img class="reporte-img" src="'+r.imagen+'" alt="Evidencia del reporte '+r.id+'">' : '';
var btnCerrar = r.estado!=='Cerrado' ? '<button class="btn-sm cerrar" data-cerrar="'+r.id+'">Cerrar</button>' : '';
return '<div class="reporte-item '+(r.tipo==='fuga'?'urgente':'')+'"><span class="reporte-tipo-tag">'+(TIPO_LABEL[r.tipo]||r.tipo)+'</span><div class="reporte-datos"><strong>'+r.direccion+'</strong><br>'+r.descripcion+'<br><small>'+r.fecha+' - Estado: '+r.estado+(r.telefono?' - '+r.telefono:'')+'</small></div>'+img+'<div class="reporte-accion"><button class="btn-sm ver" data-ver="'+r.id+'">Ver</button>'+btnCerrar+'</div></div>';
}).join('');
var vers = l.querySelectorAll('[data-ver]');
vers.forEach(function(b){b.addEventListener('click',function(){verReporte(b.getAttribute('data-ver'));});});
var cierres = l.querySelectorAll('[data-cerrar]');
cierres.forEach(function(b){b.addEventListener('click',function(){cerrarReporte(b.getAttribute('data-cerrar'));});});
}
function verReporte(id){
var r = null;
for(var i=0;i<reportesData.length;i++){if(reportesData[i].id===id){r=reportesData[i];}}
if(!r){return;}
alert('Reporte '+r.id+'\nTipo: '+(TIPO_LABEL[r.tipo]||r.tipo)+'\nLugar: '+r.direccion+'\nDescripcion: '+r.descripcion+'\nFecha: '+r.fecha+'\nEstado: '+r.estado);
}
function cerrarReporte(id){
var r = null;
for(var i=0;i<reportesData.length;i++){if(reportesData[i].id===id){r=reportesData[i];}}
if(!r){return;}
r.estado = 'Cerrado';renderizarReportes();mostrarToast('Reporte cerrado','El reporte '+id+' fue cerrado.','exito');
}
function initCharts(){
if(typeof Chart==='undefined'){return;}
var cons = $('chart-consumo');
if(cons && !charts.consumo){
var labels = [];for(var h=0;h<24;h++){labels.push((h<10?'0':'')+h+':00');}
var vals = labels.map(function(_,i){return +(2+Math.sin(i/3)*1.2+Math.random()).toFixed(1);});
charts.consumo = new Chart(cons,{type:'line',data:{labels:labels,datasets:[{label:'Consumo (L/s)',data:vals,borderColor:'#005ea8',backgroundColor:'rgba(0,153,255,0.15)',fill:true,tension:0.4}]},options:{responsive:true,maintainAspectRatio:false}});
}
var za = $('chart-alertas-zona');
if(za && !charts.zona){
var zonas = [];sensoresData.forEach(function(s){if(s.estado!=='Normal' && zonas.indexOf(s.zona)<0){zonas.push(s.zona);}});
if(!zonas.length){zonas = ['Sin alertas'];}
var zd = zonas.map(function(z){return sensoresData.filter(function(s){return s.zona===z && s.estado!=='Normal';}).length;});
if(!zd.length || !zd[0]){zd = [1];}
charts.zona = new Chart(za,{type:'doughnut',data:{labels:zonas,datasets:[{data:zd,backgroundColor:['#e74c3c','#f39c12','#0099ff','#27ae60']}]},options:{responsive:true,maintainAspectRatio:false}});
}
var ah = $('chart-ahorro');
if(ah && !charts.ahorro){
var top8 = institucionesData.slice().sort(function(a,b){return b.ahorro-a.ahorro;}).slice(0,8);charts.ahorro = new Chart(ah,{type:'bar',data:{labels:top8.map(function(i){return i.nombre.replace('I.E. ','');}),datasets:[{label:'Litros ahorrados (top 8 de '+institucionesData.length+')',data:top8.map(function(i){return i.ahorro;}),backgroundColor:'#0099ff'}]},options:{responsive:true,maintainAspectRatio:false}});
}
var ti = $('chart-tipos');
if(ti && !charts.tipos){
var tipos = [];reportesData.forEach(function(r){if(tipos.indexOf(r.tipo)<0){tipos.push(r.tipo);}});
charts.tipos = new Chart(ti,{type:'pie',data:{labels:tipos.map(function(t){return TIPO_LABEL[t]||t;}),datasets:[{data:tipos.map(function(t){return reportesData.filter(function(r){return r.tipo===t;}).length;}),backgroundColor:['#005ea8','#00c4cc','#f39c12','#27ae60','#e74c3c','#7a9aba']}]},options:{responsive:true,maintainAspectRatio:false}});
}
var iv = $('chart-inversion');
if(iv && !charts.inversion){
charts.inversion = new Chart(iv,{type:'doughnut',data:{labels:['Componentes IoT $622,8M','Adecuacion hidraulica $444,0M','Mano de obra $597,6M','Software $417,0M','Reserva e impuestos $249,8M'],datasets:[{data:[622800000,444000000,597600000,417000000,249768000],backgroundColor:['#005ea8','#0099ff','#f39c12','#27ae60','#7a9aba']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
}
var ivr = $('chart-inversion-roi');
if(ivr && !charts.inversionRoi){
charts.inversionRoi = new Chart(ivr,{type:'bar',data:{labels:['Escenario bajo','Escenario medio','Escenario alto'],datasets:[{label:'Agua desperdiciada al ano (COP $)',data:[341000000,853000000,1705000000],backgroundColor:'#e74c3c'},{label:'Ahorro con Aqua Max 30% (COP $)',data:[102000000,256000000,512000000],backgroundColor:'#27ae60'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}});
}
}
function mostrarToast(titulo,mensaje,tipo){
tipo = tipo || 'exito';
var c = $('toast-container');if(!c){return;}
var t = document.createElement('div');t.className = 'toast '+tipo;
var strong = document.createElement('strong');strong.textContent = titulo;
var span = document.createElement('span');span.className = 'toast-msg';
span.appendChild(strong);span.appendChild(document.createElement('br'));
span.appendChild(document.createTextNode(mensaje));
t.appendChild(span);c.appendChild(t);
setTimeout(function(){t.remove();},3200);
}
function mostrarError(msg){
var m = $('reporte-mensaje');if(!m){return;}
m.className = 'reporte-mensaje error';m.textContent = msg;m.style.display = 'block';
setTimeout(function(){m.style.display='none';},4000);
}
function leerImagen(input){
var f = input.files && input.files[0];if(!f){return;}
if(f.type.indexOf('image/')!==0){mostrarError('El archivo debe ser una imagen.');return;}
var rd = new FileReader();
rd.onload = function(e){
imagenReporte = e.target.result;
var p = $('img-preview');if(p){p.hidden = false;}
var s = $('img-preview-src');if(s){s.src = imagenReporte;}
};
rd.readAsDataURL(f);
}
function initReporteForm(){
var form = $('reporte-form');if(!form){return;}
var file = $('reporte-imagen');var zone = $('upload-zone');
if(file){file.addEventListener('change',function(){leerImagen(file);});}
if(zone){
zone.addEventListener('dragover',function(e){e.preventDefault();zone.classList.add('dragover');});
zone.addEventListener('dragenter',function(e){e.preventDefault();zone.classList.add('dragover');});
zone.addEventListener('dragleave',function(e){e.preventDefault();zone.classList.remove('dragover');});
zone.addEventListener('drop',function(e){e.preventDefault();zone.classList.remove('dragover');if(e.dataTransfer.files.length){file.files = e.dataTransfer.files;leerImagen(file);}});
}
var rm = $('img-remove');
if(rm){rm.addEventListener('click',function(){imagenReporte = null;if(file){file.value='';}var p = $('img-preview');if(p){p.hidden = true;}});}
form.addEventListener('submit',function(e){
e.preventDefault();
var tipo = $('reporte-tipo').value;
var direccion = $('reporte-direccion').value.trim();
var descripcion = $('reporte-descripcion').value.trim();
var telefono = $('reporte-telefono').value.trim();
if(!tipo || !direccion){mostrarError('Por favor completa los campos obligatorios.');return;}
var n = reportesData.length+1;
var nid = 'R' + (n<10 ? '00'+n : (n<100 ? '0'+n : String(n)));
var nuevo = {id:nid,tipo:tipo,direccion:direccion,descripcion:descripcion||'Sin descripcion adicional',telefono:telefono,fecha:new Date().toISOString().replace('T',' ').substring(0,19),estado:'Nuevo',imagen:imagenReporte};
reportesData.unshift(nuevo);renderizarReportes();actualizarStats();form.reset();imagenReporte = null;
var p = $('img-preview');if(p){p.hidden = true;}
var msj = $('reporte-mensaje');msj.className = 'reporte-mensaje success';msj.textContent = 'Reporte enviado correctamente. El encargado de mantenimiento sera notificado.';msj.style.display = 'block';
setTimeout(function(){msj.style.display='none';},5000);
mostrarToast('Reporte enviado','Falla reportada en '+direccion,'exito');
});
}
function initNav(){
var links = document.querySelectorAll('.nav-link,.side-link');
links.forEach(function(a){
a.addEventListener('click',function(e){
var href = a.getAttribute('href');
if(!href || href.charAt(0)!=='#'){return;}
var sec = document.querySelector(href);if(!sec){return;}
e.preventDefault();sec.scrollIntoView({behavior:'smooth',block:'start'});
if(href==='#mapa'&&window.__aquaInvalidateMap){setTimeout(window.__aquaInvalidateMap,400);setTimeout(window.__aquaInvalidateMap,1000);}
links.forEach(function(l){l.classList.remove('active');});
var twins = document.querySelectorAll('[href="'+href+'"]');
twins.forEach(function(l){l.classList.add('active');});
if(window.innerWidth<=900){document.body.classList.remove('nav-open');}
});
});
initSidebar();
}

/* ===== Barra lateral desplegable ===== */
function initSidebar(){
var tg = $('sidebar-toggle'), col = $('sidebar-collapse'), bd = $('sidebar-backdrop');
var CLAVE = 'aqua-sidebar-estado';
function esMovil(){return window.innerWidth<=900;}
function abrir(){document.body.classList.add('nav-open');}
function cerrar(){document.body.classList.remove('nav-open');}
function guardar(){try{localStorage.setItem(CLAVE,document.body.classList.contains('nav-collapsed')?'collapsed':'visible');}catch(e){}}
function aplicar(){
  if(esMovil()){document.body.classList.remove('nav-collapsed');return;}
  var pref = null;try{pref = localStorage.getItem(CLAVE);}catch(e){}
  document.body.classList.toggle('nav-collapsed', pref==='collapsed');
}
if(tg){tg.addEventListener('click',function(){
  if(esMovil()){ if(document.body.classList.contains('nav-open')){cerrar();}else{abrir();} }
  else { document.body.classList.toggle('nav-collapsed'); guardar(); }
});}
if(col){col.addEventListener('click',function(){
  if(esMovil()){cerrar();}else{document.body.classList.add('nav-collapsed');guardar();}
});}
if(bd){bd.addEventListener('click',cerrar);}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){cerrar();}});
aplicar();
var rt = null;
window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(aplicar,150);});
}
function initAcordeon(){
document.querySelectorAll('.acordion-btn').forEach(function(b){
b.addEventListener('click',function(){b.parentElement.classList.toggle('active');});
});
}
function initPerfil(){
var f = $('perfil-form');if(!f){return;}
f.addEventListener('submit',function(e){
e.preventDefault();
var m = $('perfil-mensaje');if(m){m.style.display='block';setTimeout(function(){m.style.display='none';},3000);}
mostrarToast('Perfil actualizado','Datos de la institucion guardados.','exito');
});
}
function normTxt(t){return (t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}function totalIEO(){return comunasData.reduce(function(a,c){return a+c.colegios.length;},0);}function renderizarComunas(filtro){var box=document.getElementById('comuna-acordeon');if(!box){return;}var q=normTxt(filtro);box.innerHTML='';var tot=0,vis=0;comunasData.forEach(function(c){tot+=c.colegios.length;var lista=c.colegios.filter(function(n){return !q||normTxt(n).indexOf(q)>=0||normTxt(c.barrios).indexOf(q)>=0||normTxt(c.comuna).indexOf(q)>=0;});if(q&&lista.length===0){return;}vis+=lista.length;var item=document.createElement('div');item.className='comuna-item'+(q?' active':'');var btn=document.createElement('button');btn.className='comuna-btn';btn.type='button';btn.innerHTML='<span>'+c.comuna+' ('+lista.length+' IEO)</span><span class="vinculada">Vinculada</span>';var panel=document.createElement('div');panel.className='comuna-panel';var h=document.createElement('small');h.textContent='Barrios: '+c.barrios;var ul=document.createElement('ul');lista.forEach(function(n){var li=document.createElement('li');li.innerHTML='<span>'+n+'</span><span class="vinculada mini">Vinculada</span>';ul.appendChild(li);});panel.appendChild(h);panel.appendChild(ul);btn.addEventListener('click',function(){item.classList.toggle('active');});item.appendChild(btn);item.appendChild(panel);box.appendChild(item);});var cnt=document.getElementById('inst-contador');if(cnt){cnt.textContent='Mostrando '+vis+' de '+tot+' instituciones vinculadas';}}function initComunas(){var inp=document.getElementById('inst-search');if(inp){inp.addEventListener('input',function(){renderizarComunas(inp.value);});}renderizarComunas('');}
var retosQuiz = [
  {preg:"¿Cuántos litros pierde una llave que gotea 10 gotas por minuto en un día?", opts:["3 L","30 L","300 L"], r:1},
  {preg:"¿Qué porcentaje del agua tratada en Latinoamérica se pierde por fugas?", opts:["10-20%","20-40%","60-80%"], r:1},
  {preg:"¿Cuántos litros gasta dejar la lluvia corriendo 1 minuto mientras te cepillas los dientes?", opts:["6 L","12 L","24 L"], r:1},
  {preg:"¿Qué sensor verifica doble chequeo con el medidor de flujo?", opts:["Temperatura","PIR de presencia","Humedad"], r:1},
  {preg:"¿Cuántas instituciones educativas oficiales del listado de Santiago de Cali están vinculadas?", opts:["92","240","450"], r:1},
  {preg:"¿Cuál es el lema de la campaña Cada Gota Cuenta?", opts:["Ahorra hoy","Cierra - Reporta - Ahorra","Agua es vida"], r:1},
  {preg:"¿Qué app web simula este monitoreo?", opts:["Gotica","Aqua Max","Agua Cali"], r:1},
  {preg:"¿Qué debe hacer un estudiante al encontrar una fuga?", opts:["Pasar de largo","Reportar con foto","Regar plantas"], r:1},
  {preg:"¿En qué se compara la lectura del caudalimetro?", opts:["Con el clima","Con el histórico y con el PIR","Con el horario escolar"], r:1},
  {preg:"¿Cuál es el retorno económico por reducir fugas?", opts:["1:1","1:3","1:5"], r:2}
];
var quizState = {idx:0, puntos:0};
function renderQuiz(){
  var q = retosQuiz[quizState.idx];
  var pq = $("quiz-pregunta");
  var ops = $("quiz-opciones");
  if(!pq || !ops){ return; }
  pq.textContent = q.preg;
  ops.innerHTML = "";
  q.opts.forEach(function(o, i){
    var b = document.createElement("button");
    b.className = "quiz-op";
    b.textContent = o;
    b.onclick = (function(correcta){
      return function(){
        if(correcta){
          quizState.puntos += 10;
          $("quiz-puntos").textContent = "Puntos: " + quizState.puntos;
          mostrarToast("Correcto", "+10 pts", "exito");
        } else {
          mostrarToast("Ups!", "Revisa el dato en Concientizacion", "error");
        }
        quizState.idx = (quizState.idx + 1) % retosQuiz.length;
        $("quiz-progreso").textContent = "Reto " + (quizState.idx + 1) + "/" + retosQuiz.length;
        renderQuiz();
      };
    })(i === q.r);
    ops.appendChild(b);
  });
}
function nextQuiz(){
  quizState.idx = (quizState.idx + 1) % retosQuiz.length;
  renderQuiz();
}
function simularTiempoReal(){
setInterval(function(){
sensoresData.forEach(function(s){var d = (Math.random()-0.5)*0.6;if(Math.random()<0.06){d+=1.5;}s.flujoActual = Math.max(0.1,+(s.flujoActual+d).toFixed(1));if(s.flujoActual>s.flujoNormal*2){s.estado='ALERTA';}else if(s.flujoActual>s.flujoNormal*1.4){s.estado='Advertencia';}else{s.estado='Normal';}});
renderizarSensores();
},4000);
}
document.addEventListener('DOMContentLoaded',function(){
actualizarReloj();setInterval(actualizarReloj,1000);
renderizarSensores();renderizarAlertas();renderizarAlertasAutomaticas();renderizarReportes();
renderizarDiag();renderizarAdmin();renderizarMisiones();renderizarComunas('');initCharts();initReporteForm();initNav();initAcordeon();initPerfil();initComunas();actualizarStats();simularTiempoReal();renderQuiz();
});
