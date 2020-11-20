module.exports = app => {
  const pagos = require("../controllers/pagos.controller.js")

  app.post("/pagos", pagos.create)

  app.get("/pagos", pagos.findAll)

  app.get("/pagos/:id", pagos.findOne)

  app.put("/pagos/:id", pagos.update)

  app.delete("/pagos/:id", pagos.delete)

  app.delete("/pagos", pagos.deleteAll)
};