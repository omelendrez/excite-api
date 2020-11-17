module.exports = app => {
  const subtipos = require("../controllers/tipo1.controller.js")

  app.post("/subtipos", subtipos.create)

  app.get("/subtipos", subtipos.findAll)

  app.get("/subtipos/:customerId", subtipos.findOne)

  app.put("/subtipos/:customerId", subtipos.update)

  app.delete("/subtipos/:customerId", subtipos.delete)

  app.delete("/subtipos", subtipos.deleteAll)
};