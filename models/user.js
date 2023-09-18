'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    apellidos: String, 
    cedula: Number,
    foto: String
});

module.exports = mongoose.model('User', UserSchema);