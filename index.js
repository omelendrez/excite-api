const express = require("express");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

require("./app/routes")(app);

app.get("/", (req, res) => {
  res.status(404).json({ message: 'Ruta inexistente' });
});

const port = process.env.PORT || 3000;
app.listen(`${port}`, () => {
  console.log(`Server now listening at localhost:${port}, papá!`);
});
