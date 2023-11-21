// authController.js
const connection = require('../db/database');
const bcrypt = require('bcrypt');

const usuario = 'matias';
const clave = '123456';

// Genera un salt y hashea la contraseña antes de almacenarla
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(clave, salt, (err, hash) => {
    if (err) throw err;

    const queryString = 'INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)';
    connection.query(queryString, [usuario, hash], (error, results, fields) => {
      if (error) {
        console.error("error al ejecutar la consulta", error);
      } else {
        console.log("Consulta ejecutada con éxito");
      }
    });
  });
});


async function handleLogin(req, res) {
    const { usuario, clave } = req.body;
  
    const queryString = 'SELECT * FROM usuarios WHERE nombre = ?';
    connection.query(queryString, [usuario], async (error, results, fields) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }
  
      if (results.length > 0) {
        const user = results[0];
  
        // Verificar la contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(clave, user.contrasena);
  
        if (passwordMatch) {
          // Credenciales válidas
          req.session.loggedin = true;
          req.session.usuario = usuario;
          // Reiniciar el contador de intentos después de un inicio de sesión exitoso
          req.session.loginAttempts = 0;
          res.redirect('/grilla.html');
        } else {
          // Credenciales inválidas
          handleInvalidLogin(req, res);
        }
      } else {
        // Usuario no encontrado
        handleInvalidLogin(req, res);
      }
    });
  }
  
  function handleInvalidLogin(req, res) {
    // Incrementar el contador de intentos de inicio de sesión
    req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;
  
    // Verificar si se superó el número máximo de intentos permitidos
    if (req.session.loginAttempts >= 3) {
      res.status(429).send('Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.'); // Devolver código 429 Too Many Requests
    } else {
      // Credenciales inválidas
      res.redirect('/login?error=invalid_credentials');
    }
  }
  
  module.exports = {
    handleLogin,
  };