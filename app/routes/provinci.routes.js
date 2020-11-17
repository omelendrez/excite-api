module.exports = app => {
  const provinci = require("../controllers/provinci.controller.js")

  app.post("/provincias", provinci.create)

  app.get("/provincias", provinci.findAll)

  app.get("/provincias/:customerId", provinci.findOne)

  app.put("/provincias/:customerId", provinci.update)

  app.delete("/provincias/:customerId", provinci.delete)

  app.delete("/provincias", provinci.deleteAll)
};