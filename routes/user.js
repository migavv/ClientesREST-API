'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.get('/user/:id', UserController.getUser);
router.get('/users', UserController.getUsers);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);
router.put('/upload-image/:id', multipartMiddleware, UserController.uploadImage);

module.exports = router;