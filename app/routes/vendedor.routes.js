module.exports = app => {
  const vendedores = require("../controllers/vendedor.controller.js")

  app.post("/vendedores", vendedores.create)

  app.get("/vendedores", vendedores.findAll)

  app.get("/vendedores/:id", vendedores.findOne)

  app.put("/vendedores/:id", vendedores.update)

  app.delete("/vendedores/:id", vendedores.delete)

  app.delete("/vendedores", vendedores.deleteAll)
};