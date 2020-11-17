module.exports = app => {
  const remitos = require("../controllers/remitos.controller.js")

  app.post("/remitos", remitos.create)

  app.get("/remitos", remitos.findAll)

  app.get("/remitos/:customerId", remitos.findOne)

  app.put("/remitos/:customerId", remitos.update)

  app.delete("/remitos/:customerId", remitos.delete)

  app.delete("/remitos", remitos.deleteAll)
};