// Requires
var express = require('express');
var app = express();
var bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
const mdAuenticacion = require('../middlewares/autenticacion');

var Usuario = require('../models/usuario');

// Obtener todos lo usuarios
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Ocurrio un error al intentar cargar los usuarios!',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })
});


// Actualizar usuario
app.put('/:id', mdAuenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error al buscar el usuario!',
                errors: err
            });
        }
        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario con id '+ id + ' No existe!',
                errors: { message: 'User not found' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, userSave) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Ocurrio un error al intentar actualizar usuario!',
                    errors: err
                });
            }
    
            res.status(200).json({
                ok: true,
                usuario: userSave
            });
        });
    
    });
});

//Crear nuevo usuario
app.post('/', mdAuenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        img: body.img,
        role: body.role,
    });

    usuario.save((err, userSave) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error al intentar crear usuario!',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: userSave,
            usuarioToken: req.usuario
        });
    });

});

// Eliminar usuario
app.delete('/:id', mdAuenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuario) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error al eliminar el usuario!',
                errors: err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario con id '+ id + ' No existe!',
                errors: { message: 'User not found' }
            });
        }
        
        res.status(200).json({
            ok: true,
            usuario: usuario
        });
    
    });
});

module.exports = app;