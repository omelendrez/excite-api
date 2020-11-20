module.exports = app => {
  const numeros = require("../controllers/numeros.controller.js")

  app.post("/numeros", numeros.create)

  app.get("/numeros", numeros.findAll)

  app.get("/numeros/:id", numeros.findOne)

  app.put("/numeros/:id", numeros.update)

  app.delete("/numeros/:id", numeros.delete)

  app.delete("/numeros", numeros.deleteAll)
};