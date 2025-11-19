Pagina|	Objetos de Repo 
Integrantes| Diego Alvear Guerra| Moisés Beltrán Rojas

Esta es una pagina dedicada al VideoJuego R.E.P.O, para distribución de contenido relacionado al mismo, principalmente como una "Wiki" de Objetos del juego.



Al iniciar la pagina se presenta un video e imagen meme del juego en su body, luego resalta su footer un Link a la Pagina de Steam para comprar el juego.

Luego yéndonos a las pestañas lateral izquierda podremos viajar entre 3 apartados, asimismo puede viajar al resto de los mismos sin importar la pestaña en donde te encuentres de la misma manera.

En Acerca de nosotros de contamos más sobre quienes somos y nuestro objetivo.

En Contacto se reúnen los diferentes medios por el cual los usuarios pueden intentar contactarnos.

En Avisos legales esta todo el contenido relacionado a la propiedad intelectual protegida de la obra original.

Finalmente en Objetos en donde desplegamos nuestra lista general de todos los objetos que actualmente mostramos en nuestra pagina, además de tener 2 vías de filtración de estos, primero a través del la pestaña contextual en donde podemos filtrar según ubicación. La segunda vía es por búsqueda directa en campo de texto, por el cual escribes el nombre del item y se muestran los resultados coincidentes. En Ambos casos debes seleccionar/escribir tu opción y luego clickear en el botón Buscar para que funcione correctamente.

|| Estructura de carpetas

Assets: Donde Se Guardan los estilos css, las imágenes en img y el código java en js.
Backend: Donde yace el archivo de nuestro servidor server.js
archivos json:Necesarios para el correcto funcionamiento de nuestra pagina con uso de base de datos
Index: HTML de nuestra main page.
Acerca/Avisos/Contacto: HTML donde se muestra información de la pagina y se puede viajar entre la misma.
Objetos: HTML donde funciona la galería, búsqueda y filtración de los objetos que maneja nuestra base de datos.

A continuacion se presenta la base de datos: 
create database REPO;
USE REPO;
-- La tabla de jugador almacena la informacion principal de cada jugador, 
-- incluyendo su progreso y el dinero que tiene acumulado durante el juego. 
CREATE TABLE `Jugador` (
  `Jugador_ID` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(150),
  `Dinero_Acumulado` integer,
  `Progreso` float
);

-- Esta tabla Representa el inventraio individual de cada jugador. 
-- Define la capacidad maxima que puede llevar el jugador y esta asociada a la tabla de Jugador. 
CREATE TABLE `Inventario` (
  `Inventario_ID` integer UNIQUE PRIMARY KEY AUTO_INCREMENT,
  `Jugador_ID` integer,
  `Capacidad_Maxima` integer
);

-- La tabla de almacenamiento gestiona los obejtos que encuentra en el inventario 
-- indicando la cantidad  y los objetos almacenados por el jugador. 
CREATE TABLE `Almacenamiento` (
  `Almacenamiento_ID` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Cantidad` integer,
  `Objeto_ID` integer,
  `Inventario_ID` integer
);

-- Esta tabla representa los objetos obenidos dentro del juego 
-- Cada objeto posee un valor, un tamaño, una ubicacion de donde se encuentra y su nombre.  
CREATE TABLE `Objeto` (
  `Objeto_ID` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Tamaño_ID` integer,
  `Ubicacion_ID` integer,
  `Valor` varchar(250),
  `Nombre` varchar(250)
);

-- Define las caracteristicas fisicas de los objetos 
-- Como el espacio que ocupa, su masa y si es apilable o no. 
CREATE TABLE `Tamaño` (
  `Tamaño_ID` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Espacio_Ocupado` integer,
  `Descripcion` varchar(250),
  `Masa` float,
  `Apilable` boolean
);

-- Contiene las distintas zonas del juego 
-- donde se pueden encontrar los objetos.
CREATE TABLE `Ubicacion` (
  `Ubicacion_ID` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(150),
  `Nivel_Dificultad` varchar(150)
);

-- Cada objeto puede pertenecer a una ubicacion ej: Pocion Maestra se encuentra en la ubicaion de Academia Swiftbroom
ALTER TABLE `Objeto` ADD CONSTRAINT `fk_Objeto_Ubicacion_ID_Ubicacion` FOREIGN KEY (`Ubicacion_ID`) REFERENCES `Ubicacion` (`Ubicacion_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION; 

-- Cada objeto tiene su propio tamaño definido 
ALTER TABLE `Objeto` ADD CONSTRAINT `fk_Objeto_Tamaño_ID_Tamaño` FOREIGN KEY (`Tamaño_ID`) REFERENCES `Tamaño` (`Tamaño_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Cada almacenamiento pertene a un inventario del jugador
ALTER TABLE `Almacenamiento` ADD CONSTRAINT `fk_Almacenamiento_Inventario_ID_Inventario` FOREIGN KEY (`Inventario_ID`) REFERENCES `Inventario` (`Inventario_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- El inventario pertenece a un jugador 
ALTER TABLE `Inventario` ADD CONSTRAINT `fk_Inventario_Jugador_ID_Jugador` FOREIGN KEY (`Jugador_ID`) REFERENCES `Jugador` (`Jugador_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Cada almacenamiento  hace referecia a un objeto 
ALTER TABLE `Almacenamiento` ADD CONSTRAINT `fk_Almacenamiento_Objeto_ID_Objeto` FOREIGN KEY (`Objeto_ID`) REFERENCES `Objeto` (`Objeto_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION; 

y los datos insertados 
use repo;  
insert into tamaño(Espacio_Ocupado, Descripcion, Masa, Apilable)
values  
(1, 'Objeto muy pequeño y ligero', 0.2, TRUE),
(2, 'Objeto pequeño de tamaño estándar', 0.5, TRUE),
(3, 'Objeto grande y pesado', 2.0, FALSE);     

insert into ubicacion(Nombre, Nivel_Dificultad)
values
('Academia Swiftbroom', 'facil'),
('Mansion del jefe', 'medio'),
('Estación McJannek','dificil'),
('Museo del Arte Humano','dificil' ); 

insert into jugador(Nombre,Dinero_Acumulado,Progreso)
values
('Ego',500,10.55),  
('SebaEnpxdxd',4000,45),
('Burenya',400,23),
('Zsykerms',3000,23); 

insert into inventario(Jugador_ID,Capacidad_Maxima)
values
(1,3),
(2,4),
(3,2),
(4,5);

insert into objeto(Tamaño_ID, Ubicacion_ID, Valor, Nombre)
values
(2,1, '2000-3000','Diamante'),
(2,2, '500-600', 'Pulsera de esmeraldas'),
(2,2, '500-600', 'Copa'),
(2,2, '500-600', 'Ocarina'),
(2,2, '500-600', 'Reloj de bolsillo'),
(2,2, '1200-2000', 'Taza de urinario'),
(2,4, '500-600', 'Diente'),
(2,4, '1200-2000', 'Pez dorado'),
(2,4, '500-600', 'Pez'),
(2,4, '900-1100', 'Banana Bow'),
(2,4, '900-1100', 'Pez Plateado'),
(2,4, '500-600', 'Cerebro Genial'),
(2,4, '500-600', 'Tostada'),
(2,4, '900-1100', 'Diente de oro'),
(3,4, '500-600', 'Muñeca de Ruben'),
(2,1, '500-600', 'Corona'),
(2,2, '1200-2000', 'Rana'),
(3,2, '500-600', 'Muñeca'),
(3,2, '500-600', 'Dinero'),
(3,1, '900-1100', 'Caja de gemas'),
(3,2, '900-1100', 'Mono de jugete'),
(2,2, '2000-3000', 'Placa de uranio'),
(2,2, '1200-2000', 'Jarron pequeño'),
(3,2, '1200-2000', 'Globo'), 
(2,1, '2000-3000', 'Libro de masticar'),
(3,1, '2000-3000', 'Pocion de amor'),
(3,2, '3500-4500', 'Caja de musica'),
(3,3, '900-1100', 'Arbol bonsai'),
(2,3, '2000-3000', 'disco duro'),
(2,4, '900-1100', 'coche de juguete'),
(2,4, '900-1100', 'avion de juguete'),
(2,4, '900-1100', 'Torre cubica'),
(2,4, '900-1100', 'Hombre pato'),
(2,4, '1200-2000', 'Bola cubica'),
(3,4, '1200-2000', 'Masa de carne');

insert into almacenamiento(Cantidad,Objeto_ID,Inventario_ID)
values
(2,22,1),
(1,1,2),
(1,22,3),
(1,33,4);

select obj.Nombre,obj.Valor,ubi.Nombre 
from objeto as obj 
join ubicacion as ubi on obj.Ubicacion_ID = ubi.Ubicacion_ID;
