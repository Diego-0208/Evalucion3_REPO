const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",       
    password: "root",        
    database: "repo"     // tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a MySQL");
});

// Ruta 1: Obtener todos los objetos
app.get("/objetos", (req, res) => {
    const query = `
        SELECT obj.Objeto_ID, obj.Nombre, obj.Valor, ubi.Nombre AS Ubicacion
        FROM objeto obj
        JOIN ubicacion ubi ON obj.Ubicacion_ID = ubi.Ubicacion_ID
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener objetos:", err);
            res.status(500).send("Error al obtener datos");
            return;
        }
        res.json(results);
    });
});

// Levantar servidor
app.listen(3000, () => {
    console.log("Servidor Backend corriendo en http://localhost:3000");
});
