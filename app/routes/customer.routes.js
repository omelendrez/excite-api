module.exports = app => {
  const customers = require("../controllers/customer.controller.js")

  app.post("/customers", customers.create)

  app.get("/customers", customers.findAll)

  app.get("/customers/:id", customers.findOne)

  app.put("/customers/:id", customers.update)

  app.delete("/customers/:id", customers.delete)

  app.delete("/customers", customers.deleteAll)
};