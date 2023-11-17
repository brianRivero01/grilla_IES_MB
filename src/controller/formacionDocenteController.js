const db = require('../db/database')

// Controlador para insertar datos en la base de datos
function insertarDatos(req, res) {
  console.log(req.body)
  const { nombreDocente, totalA, totalB, totalC, totalD, totalE, 
    totalF, totalG, totalH, totalI, totalJ, 
    totalK, totalL, total 
  } = req.body;
  
  // Ejecuta una consulta SQL para insertar los datos
  const sql = 'INSERT INTO grilla (nombre,total_promedio,total_a_titulo,total_b_formacion_posterior,total_c_antiguedad,total_d_participacion_eventos,total_e_elaboracion_y_dictado,total_f_trabajos_investigacion,total_g_publicaciones,total_h_asistencias,total_i_otros_desempeños,total_j_cargos,total_k_otras_actividades,total_l_desempeños_especificos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  db.query(sql, [ nombreDocente, total, totalA, totalB, totalC, totalD, totalE, 
    totalF, totalG, totalH, totalI, totalJ, 
    totalK, totalL ], (err, results) => {
    if (err) {
      console.error('Error al insertar datos en la base de datos: ' + err.message);
      res.status(500).json({ error: 'Error al insertar datos' });
    } else {
      console.log('Datos insertados en la base de datos');
      res.status(200).json({ message: 'Datos insertados correctamente' });
    }
  });
}

module.exports = {
  insertarDatos,
};
