module.exports = app => {
  const producto = require("../controllers/producto.controller.js")

  app.post("/productos", producto.create)

  app.get("/productos", producto.findAll)

  app.get("/productos/:customerId", producto.findOne)

  app.put("/productos/:customerId", producto.update)

  app.delete("/productos/:customerId", producto.delete)

  app.delete("/productos", producto.deleteAll)
};