const express = require('express');

const router = express.Router();
const formacionDocenteController = require('../controller/formacionDocenteController');


router.post('/enviarDatos', formacionDocenteController.insertarDatos);
module.exports = router