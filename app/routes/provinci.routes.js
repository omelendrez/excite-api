module.exports = app => {
  const provinci = require("../controllers/provinci.controller.js")

  app.post("/provincias", provinci.create)

  app.get("/provincias", provinci.findAll)

  app.get("/provincias/:id", provinci.findOne)

  app.put("/provincias/:id", provinci.update)

  app.delete("/provincias/:id", provinci.delete)

  app.delete("/provincias", provinci.deleteAll)
};