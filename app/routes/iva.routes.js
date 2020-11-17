module.exports = app => {
  const iva = require("../controllers/iva.controller.js")

  app.post("/iva", iva.create)

  app.get("/iva", iva.findAll)

  app.get("/iva/:customerId", iva.findOne)

  app.put("/iva/:customerId", iva.update)

  app.delete("/iva/:customerId", iva.delete)

  app.delete("/iva", iva.deleteAll)
};