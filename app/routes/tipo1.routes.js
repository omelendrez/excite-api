module.exports = app => {
  const subtipos = require("../controllers/tipo1.controller.js")

  app.post("/subtipos", subtipos.create)

  app.get("/subtipos", subtipos.findAll)

  app.get("/subtipos/:id", subtipos.findOne)

  app.put("/subtipos/:id", subtipos.update)

  app.delete("/subtipos/:id", subtipos.delete)

  app.delete("/subtipos", subtipos.deleteAll)
};