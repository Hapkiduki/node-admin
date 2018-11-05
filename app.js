// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



// Inicializr variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var LoginRoutes = require('./routes/login');

// Conexion a base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res)=>{
    if (err) throw err;

    console.log("Base de datos \x1b[32m%s\x1b[0m", "Online!");
})

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);
app.use('/login', LoginRoutes);

// Escuchar peticiones
app.listen(3000, ()=>{
    console.log("Servidor \x1b[32m%s\x1b[0m", "Online!");
});