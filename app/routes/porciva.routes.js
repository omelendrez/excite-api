module.exports = app => {
  const porciva = require("../controllers/porciva.controller.js")

  app.post("/porciva", porciva.create)

  app.get("/porciva", porciva.findAll)

  app.get("/porciva/:id", porciva.findOne)

  app.put("/porciva/:id", porciva.update)

  app.delete("/porciva/:id", porciva.delete)

  app.delete("/porciva", porciva.deleteAll)
};