module.exports = app => {
  const ajustes = require("../controllers/ajustest.controller.js")

  app.post("/ajustes", ajustes.create)

  app.get("/ajustes", ajustes.findAll)

  app.get("/ajustes/:customerId", ajustes.findOne)

  app.put("/ajustes/:customerId", ajustes.update)

  app.delete("/ajustes/:customerId", ajustes.delete)

  app.delete("/ajustes", ajustes.deleteAll)
};