const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const app = express();

const Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    const body = req.body;

    Usuario.findOne({ email: body.email}, (err, user)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Ocurrio un error al buscar usuarios!',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encuentra usuario con estas credenciales!',
                errors: err
            });
        }

        if (!bcryptjs.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña incorrecta!',
                errors: err
            });
        }

        // Token
        user.password = '(Y)';
        const token = jwt.sign({ usuario: user}, SEED, { expiresIn: 14400 }) // 4 Horas;
        
        res.status(200).json({
            ok: true,
            usuario: user,
            token,
            id: user._id
        });
    });
});

module.exports = app;