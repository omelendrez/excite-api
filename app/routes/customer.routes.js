module.exports = app => {
  const records = require("../controllers/record.controller.js")

  app.post("/records", records.create)

  app.get("/records", records.findAll)

  app.get("/records/:id", records.findOne)

  app.put("/records/:id", records.update)

  app.delete("/records/:id", records.delete)

  app.delete("/records", records.deleteAll)
};