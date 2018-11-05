var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

 var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol válido!'
 };

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El campo nombre es requerido!'] },
    email: { type: String, unique: true, required: [true, 'El campo correo es requerido!'] },
    password: { type: String, required: [true, 'El campo contraseña es requerido!'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
});

usuarioSchema.plugin(uniqueValidator, {message: 'Ya existe un usuario asociado a esta cuenta de correo!'})

module.exports = mongoose.model('Usuario', usuarioSchema);