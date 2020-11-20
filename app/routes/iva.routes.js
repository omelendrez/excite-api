module.exports = app => {
  const iva = require("../controllers/iva.controller.js")

  app.post("/iva", iva.create)

  app.get("/iva", iva.findAll)

  app.get("/iva/:id", iva.findOne)

  app.put("/iva/:id", iva.update)

  app.delete("/iva/:id", iva.delete)

  app.delete("/iva", iva.deleteAll)
};