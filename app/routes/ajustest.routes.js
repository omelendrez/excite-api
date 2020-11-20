module.exports = app => {
  const ajustes = require("../controllers/ajustest.controller.js")

  app.post("/ajustes", ajustes.create)

  app.get("/ajustes", ajustes.findAll)

  app.get("/ajustes/:id", ajustes.findOne)

  app.put("/ajustes/:id", ajustes.update)

  app.delete("/ajustes/:id", ajustes.delete)

  app.delete("/ajustes", ajustes.deleteAll)
};