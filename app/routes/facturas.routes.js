module.exports = app => {
  const facturas = require("../controllers/facturas.controller.js")

  app.post("/facturas", facturas.create)

  app.get("/facturas", facturas.findAll)

  app.get("/facturas/:customerId", facturas.findOne)

  app.put("/facturas/:customerId", facturas.update)

  app.delete("/facturas/:customerId", facturas.delete)

  app.delete("/facturas", facturas.deleteAll)
};