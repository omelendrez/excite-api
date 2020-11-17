module.exports = app => {
  const pagos = require("../controllers/pagos.controller.js")

  app.post("/pagos", pagos.create)

  app.get("/pagos", pagos.findAll)

  app.get("/pagos/:customerId", pagos.findOne)

  app.put("/pagos/:customerId", pagos.update)

  app.delete("/pagos/:customerId", pagos.delete)

  app.delete("/pagos", pagos.deleteAll)
};