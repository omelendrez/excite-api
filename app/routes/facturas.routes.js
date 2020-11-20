module.exports = app => {
  const facturas = require("../controllers/facturas.controller.js")

  app.post("/facturas", facturas.create)

  app.get("/facturas", facturas.findAll)

  app.get("/facturas/:id", facturas.findOne)

  app.put("/facturas/:id", facturas.update)

  app.delete("/facturas/:id", facturas.delete)

  app.delete("/facturas", facturas.deleteAll)
};