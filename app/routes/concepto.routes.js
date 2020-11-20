module.exports = app => {
  const conceptos = require("../controllers/concepto.controller.js")

  app.post("/conceptos", conceptos.create)

  app.get("/conceptos", conceptos.findAll)

  app.get("/conceptos/:id", conceptos.findOne)

  app.put("/conceptos/:id", conceptos.update)

  app.delete("/conceptos/:id", conceptos.delete)

  app.delete("/conceptos", conceptos.deleteAll)
};