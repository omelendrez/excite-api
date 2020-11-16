module.exports = app => {
  const vendedores = require("../controllers/vendedor.controller.js")

  app.post("/vendedores", vendedores.create)

  app.get("/vendedores", vendedores.findAll)

  app.get("/vendedores/:customerId", vendedores.findOne)

  app.put("/vendedores/:customerId", vendedores.update)

  app.delete("/vendedores/:customerId", vendedores.delete)

  app.delete("/vendedores", vendedores.deleteAll)
};