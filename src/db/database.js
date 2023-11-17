const mysql = require('mysql');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '12345',
    database: 'app_grilla',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = db;
