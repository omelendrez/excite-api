module.exports = app => {
  const remitos = require("../controllers/remitos.controller.js")

  app.post("/remitos", remitos.create)

  app.get("/remitos", remitos.findAll)

  app.get("/remitos/:id", remitos.findOne)

  app.put("/remitos/:id", remitos.update)

  app.delete("/remitos/:id", remitos.delete)

  app.delete("/remitos", remitos.deleteAll)
};