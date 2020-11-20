module.exports = app => {
  const tipos = require("../controllers/tipo.controller.js")

  app.post("/tipos", tipos.create)

  app.get("/tipos", tipos.findAll)

  app.get("/tipos/:id", tipos.findOne)

  app.put("/tipos/:id", tipos.update)

  app.delete("/tipos/:id", tipos.delete)

  app.delete("/tipos", tipos.deleteAll)
};