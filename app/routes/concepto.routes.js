module.exports = app => {
  const conceptos = require("../controllers/concepto.controller.js")

  app.post("/conceptos", conceptos.create)

  app.get("/conceptos", conceptos.findAll)

  app.get("/conceptos/:customerId", conceptos.findOne)

  app.put("/conceptos/:customerId", conceptos.update)

  app.delete("/conceptos/:customerId", conceptos.delete)

  app.delete("/conceptos", conceptos.deleteAll)
};