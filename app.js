// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializr variables
var app = express();

// Conexion a base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res)=>{
    if (err) throw err;

    console.log("Base de datos \x1b[32m%s\x1b[0m", "Online!");
})

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});

// Escuchar peticiones
app.listen(3000, ()=>{
    console.log("Servidor \x1b[32m%s\x1b[0m", "Online!");
});