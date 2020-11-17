module.exports = app => {
  const numeros = require("../controllers/numeros.controller.js")

  app.post("/numeros", numeros.create)

  app.get("/numeros", numeros.findAll)

  app.get("/numeros/:customerId", numeros.findOne)

  app.put("/numeros/:customerId", numeros.update)

  app.delete("/numeros/:customerId", numeros.delete)

  app.delete("/numeros", numeros.deleteAll)
};