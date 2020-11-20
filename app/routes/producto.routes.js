module.exports = app => {
  const producto = require("../controllers/producto.controller.js")

  app.post("/productos", producto.create)

  app.get("/productos", producto.findAll)

  app.get("/productos/:id", producto.findOne)

  app.put("/productos/:id", producto.update)

  app.delete("/productos/:id", producto.delete)

  app.delete("/productos", producto.deleteAll)
};