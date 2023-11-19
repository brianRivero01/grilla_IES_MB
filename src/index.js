const express = require('express');
const app = express();
const port = 3000;
const profesorRoutes = require("../src/routes/tlf");
const bodyParser = require('body-parser');
const connection = require('../src/db/database');
const session = require('express-session');

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
  res.redirect('login');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    // Consultar la base de datos para verificar las credenciales
    const queryString = 'SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ?';
    connection.query(queryString, [usuario, clave], (error, results, fields) => {
      if (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }

      if (results.length > 0) {
        // Credenciales válidas
        req.session.loggedin = true;
        req.session.usuario = usuario;
        res.redirect('/index.html');
      } else {
        // Credenciales inválidas
        res.send('Credenciales inválidas. Vuelve a intentarlo.');
      }
    });
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
