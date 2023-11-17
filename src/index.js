const express = require('express');
const app = express();
const port = 3000; // Puerto app
const profesorRoutes = require("../src/routes/tlf"); // Rutas
const bodyParser = require('body-parser'); 



// Archivos html, css
app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api", profesorRoutes); // Agregamos el enrutador '/api'


app.get('/inicio', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});


