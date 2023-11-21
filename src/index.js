// app.js
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/login');
const profesorRoutes = require("../src/routes/tlf"); // Rutas

app.use(session({
  secret: '86486',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Montar las rutas de autenticación
app.use("/api", authRoutes);
app.use("/api", profesorRoutes); // Agregamos el enrutador '/api'

// Redirección a la página de inicio de sesión al abrir la aplicación
app.get('/', (req, res) => {
  res.redirect('index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
