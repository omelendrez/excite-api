module.exports = app => {
  const porciva = require("../controllers/porciva.controller.js")

  app.post("/porciva", porciva.create)

  app.get("/porciva", porciva.findAll)

  app.get("/porciva/:customerId", porciva.findOne)

  app.put("/porciva/:customerId", porciva.update)

  app.delete("/porciva/:customerId", porciva.delete)

  app.delete("/porciva", porciva.deleteAll)
};