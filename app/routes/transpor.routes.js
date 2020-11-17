module.exports = app => {
  const transportes = require("../controllers/transpor.controller.js")

  app.post("/transportes", transportes.create)

  app.get("/transportes", transportes.findAll)

  app.get("/transportes/:customerId", transportes.findOne)

  app.put("/transportes/:customerId", transportes.update)

  app.delete("/transportes/:customerId", transportes.delete)

  app.delete("/transportes", transportes.deleteAll)
};