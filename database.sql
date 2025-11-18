-- ================================
--   CREACIÓN DE BASE DE DATOS
-- ================================
DROP DATABASE IF EXISTS repo;
CREATE DATABASE repo;
USE repo;

-- ================================
--   TABLA: Jugador
-- ================================
CREATE TABLE Jugador (
    Jugador_ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150),
    Dinero_Acumulado INT,
    Progreso FLOAT
);

-- ================================
--   TABLA: Inventario
-- ================================
CREATE TABLE Inventario (
    Inventario_ID INT AUTO_INCREMENT PRIMARY KEY,
    Jugador_ID INT,
    Capacidad_Maxima INT,
    FOREIGN KEY (Jugador_ID) REFERENCES Jugador(Jugador_ID)
);

-- ================================
--   TABLA: Tamaño
-- ================================
CREATE TABLE Tamaño (
    Tamaño_ID INT AUTO_INCREMENT PRIMARY KEY,
    Espacio_Ocupado INT,
    Descripcion VARCHAR(250),
    Masa FLOAT,
    Apilable BOOLEAN
);

-- ================================
--   TABLA: Ubicacion
-- ================================
CREATE TABLE Ubicacion (
    Ubicacion_ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(150),
    Nivel_Dificultad VARCHAR(150)
);

-- ================================
--   TABLA: Objeto
-- ================================
CREATE TABLE Objeto (
    Objeto_ID INT AUTO_INCREMENT PRIMARY KEY,
    Tamaño_ID INT,
    Ubicacion_ID INT,
    Valor VARCHAR(250),
    Nombre VARCHAR(250),
    FOREIGN KEY (Tamaño_ID) REFERENCES Tamaño(Tamaño_ID),
    FOREIGN KEY (Ubicacion_ID) REFERENCES Ubicacion(Ubicacion_ID)
);

-- ================================
--   TABLA: Almacenamiento
-- ================================
CREATE TABLE Almacenamiento (
    Almacenamiento_ID INT AUTO_INCREMENT PRIMARY KEY,
    Cantidad INT,
    Objeto_ID INT,
    Inventario_ID INT,
    FOREIGN KEY (Objeto_ID) REFERENCES Objeto(Objeto_ID),
    FOREIGN KEY (Inventario_ID) REFERENCES Inventario(Inventario_ID)
);

-- ================================
--   INSERTS: Tamaño
-- ================================
INSERT INTO Tamaño (Espacio_Ocupado, Descripcion, Masa, Apilable)
VALUES  
(1, 'Objeto muy pequeño y ligero', 0.2, TRUE),
(2, 'Objeto pequeño de tamaño estándar', 0.5, TRUE),
(3, 'Objeto grande y pesado', 2.0, FALSE);

-- ================================
--   INSERTS: Ubicacion
-- ================================
INSERT INTO Ubicacion (Nombre, Nivel_Dificultad)
VALUES
('Academia Swiftbroom', 'facil'),
('Mansion del jefe', 'medio'),
('Estación McJannek','dificil'),
('Museo del Arte Humano','dificil');

-- ================================
--   INSERTS: Jugador
-- ================================
INSERT INTO Jugador (Nombre, Dinero_Acumulado, Progreso)
VALUES
('Ego', 500, 10.55),  
('SebaEnpxdxd', 4000, 45),
('Burenya', 400, 23),
('Zsykerms', 3000, 23);

-- ================================
--   INSERTS: Inventario
-- ================================
INSERT INTO Inventario (Jugador_ID, Capacidad_Maxima)
VALUES
(1,3),
(2,4),
(3,2),
(4,5);

-- ================================
--   INSERTS: Objeto
-- ================================
INSERT INTO Objeto (Tamaño_ID, Ubicacion_ID, Valor, Nombre)
VALUES
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

-- ================================
--   INSERTS: Almacenamiento
-- ================================
INSERT INTO Almacenamiento (Cantidad, Objeto_ID, Inventario_ID)
VALUES
(2,22,1),
(1,1,2),
(1,22,3),
(1,33,4);
