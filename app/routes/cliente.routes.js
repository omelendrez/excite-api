module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js")

  app.post("/clientes", clientes.create)

  app.get("/clientes", clientes.findAll)

  app.get("/clientes/:customerId", clientes.findOne)

  app.put("/clientes/:customerId", clientes.update)

  app.delete("/clientes/:customerId", clientes.delete)

  app.delete("/clientes", clientes.deleteAll)
};