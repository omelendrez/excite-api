module.exports = app => {
  const tipos = require("../controllers/tipo.controller.js")

  app.post("/tipos", tipos.create)

  app.get("/tipos", tipos.findAll)

  app.get("/tipos/:customerId", tipos.findOne)

  app.put("/tipos/:customerId", tipos.update)

  app.delete("/tipos/:customerId", tipos.delete)

  app.delete("/tipos", tipos.deleteAll)
};