const conexion=require("../db/database");
// En profesorController.js
// Controlador para obtener todos los profesores
const obtenerDatosDesdeBD = (req, res) => {
    // Consulta SQL para obtener todos los profesores
    const consulta = 'SELECT * FROM grilla';
  
    // Ejecutar la consulta
    conexion.query(consulta, (error, resultados) => {
      if (error) {
        console.error('Error al obtener datos de la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
      } else {
        // Enviar los resultados como respuesta
        res.json(resultados);
      }
    });
  };
  
  // Exportar la función del controlador
  module.exports = obtenerDatosDesdeBD;
 
  