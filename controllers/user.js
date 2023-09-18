'use strict'

var User = require('../models/user');
var path = require('path');
var fs = require('fs');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy home'
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el controlador"
        });
    },

    saveUser: async function(req, res) {
        var user = new User();
        var props = req.body;
        user.nombre = props.nombre;
        user.apellidos = props.apellidos;
        user.cedula = props.cedula;

        try {
            const saved = await user.save();
            if(!saved) return res.status(404).send({ message: 'No se guardó el usuario'});
            return res.status(200).send({user: saved});
        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar el usuario'});
        }
    },

    getUser: async function(req, res) {
        try {
            var user = await User.findById(req.params.id).exec();
            if(!user) return res.status(404).send({message: "No se encontró el usuario"});
            return res.status(200).send({user});
        } catch (err) {
            return res.status(500).send({message: "Error al retornar datos"});
        }
    },

    getUsers: async function(req, res) {
        try {
            var users = await User.find({});
            if(!users) return res.message(404).send({message: "No se encontraron usuarios"});
            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send({message: "Error retornando usuarios"});
        }
    },

    updateUser: async function(req, res) {
        var userId = req.params.id;
        var update = req.body;

        console.log(userId);
        console.log(update);

        try {
            var updated = await User.findByIdAndUpdate(userId, update, {new: true});
            if(!updated) return res.status(404).send({message: "No se actualizó"});
            return res.status(200).send({user: updated});
        } catch (err) { 
            console.log(err);
            return res.status(500).send({message: "Error al actualizar"});
        }
    },

    deleteUser: async function(req, res) {
        var userId = req.params.id;
        try {
            var deleted = await User.findByIdAndRemove(userId);
            if(!deleted) return res.status(404).send({message: "No se borró el usuario"});
            return res.status(200).send({deleted});
        } catch (err) {
            console.log(err);
            return res.status(500).send({message: "Error eliminando usuario"});
        }
    }, 

    uploadImage: async function(req, res) {
        var userId = req.params.id;
        var fileName = 'Imagen no subida';

        if(req.files) {
            var filePath = req.files.foto.path;
            //var fileSplit = filePath.split('\\');
            fileName = path.basename(filePath);
            var fileExt= path.extname(filePath);

            console.log(fileExt);

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
                try {
                    var update = await User.findByIdAndUpdate(userId, {foto: fileName}, {new: true});
                    if(!update) return res.status(404).send({message: "No se encontró el usuario"});
                    return res.status(200).send({update});
                } catch(err) {
                    return res.status(500).send({message: "Error subiendo imagen"});
                }
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "La extensión no es válida"});
                })
            }
        } else return res.status(200).send({message: fileName});
    }
}

module.exports = controller;