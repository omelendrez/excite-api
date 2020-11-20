module.exports = app => {
  const estados = require("../controllers/estados.controller.js")

  app.post("/estados", estados.create)

  app.get("/estados", estados.findAll)

  app.get("/estados/:id", estados.findOne)

  app.put("/estados/:id", estados.update)

  app.delete("/estados/:id", estados.delete)

  app.delete("/estados", estados.deleteAll)
};