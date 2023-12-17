const express = require('express');
const router = express.Router();
const obtenerDatosDesdeBD = require('../controller/mostrarController'); // Importa tu controlador

router.get('/mostrar', obtenerDatosDesdeBD);

module.exports = router;