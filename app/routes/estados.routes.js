module.exports = app => {
  const estados = require("../controllers/estados.controller.js")

  app.post("/estados", estados.create)

  app.get("/estados", estados.findAll)

  app.get("/estados/:customerId", estados.findOne)

  app.put("/estados/:customerId", estados.update)

  app.delete("/estados/:customerId", estados.delete)

  app.delete("/estados", estados.deleteAll)
};