const express = require('express');
const app = express();
const port = 3000;
const profesorRoutes = require("../src/routes/tlf");
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const connection = require('../src/db/database');
const session = require('express-session');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // Número máximo de intentos permitidos
  message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo más tarde.',
});

app.use(session({
  secret: '86486',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api", profesorRoutes);

// Redirección a la página de inicio de sesión al abrir la aplicación
app.get('/', (req, res) => {
  res.redirect('login.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', limiter, async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const queryString = 'SELECT * FROM usuarios WHERE nombre = ?';
    connection.query(queryString, [usuario], (error, results, fields) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }

      if (results.length > 0) {
        const user = results[0];

        // Verificar la contraseña sin bcrypt (no recomendado para producción)
        if (clave === user.contrasena) {
          // Credenciales válidas
          req.session.loggedin = true;
          req.session.usuario = usuario;
          // Reiniciar el contador de intentos después de un inicio de sesión exitoso
          req.session.loginAttempts = 0;
          res.redirect('/index.html');
        } else {
          // Credenciales inválidas
          handleInvalidLogin(req, res);
        }
      } else {
        // Usuario no encontrado
        handleInvalidLogin(req, res);
      }
    });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

function handleInvalidLogin(req, res) {
  // Incrementar el contador de intentos de inicio de sesión
  req.session.loginAttempts = (req.session.loginAttempts || 0) + 1;

  // Verificar si se superó el número máximo de intentos permitidos
  if (req.session.loginAttempts >= limiter.max) {
    res.status(429).send(limiter.message); // Devolver código 429 Too Many Requests
  } else {
    // Credenciales inválidas
    res.redirect('/login?error=invalid_credentials');
  }
}

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
