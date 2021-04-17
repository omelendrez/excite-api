const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

require("./app/routes")(app);

app.get("/", (req, res) => {
  res.status(404).json({ message: "Ruta inexistente" });
});

const port = process.env.PORT || 3000;
app.listen(`${port}`, () => {
  console.log(`Server now listening at localhost:${port}`);
});
