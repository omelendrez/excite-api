module.exports = app => {
  const transportes = require("../controllers/transpor.controller.js")

  app.post("/transportes", transportes.create)

  app.get("/transportes", transportes.findAll)

  app.get("/transportes/:id", transportes.findOne)

  app.put("/transportes/:id", transportes.update)

  app.delete("/transportes/:id", transportes.delete)

  app.delete("/transportes", transportes.deleteAll)
};