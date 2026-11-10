const express = require('express');
const cors = require ('cors');
const mysql = require('mysql2/promise'); // condigurar para postgress

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Configuracion de la conexion de la base de datos
const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: 'D3rly123',
    database: 'retro_store',
    port: '3306'
});


// Rutas de la API REST ( ENDPOINTS)

//RUTA  DE PRUEBA PRINCIPAL
app.get('/', (req,res) => {
    res.send('Servidor de backend de retro store funcionando');
});

//RUTA GET: Obtener juegos desde la base de datos
app.get('/api/juegos', async (req,res) => {

    try{
        const [rows] = await pool.query('SELECT * FROM juegos ORDER BY id ASC');
        res.json(rows);
    }catch (error){
        console.error("Error en la consulta GET:", error.message);
        res.status(500).json({ error: 'error al consultar la base de datos'});
    }

});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en LocalHost:${PORT}`);
});