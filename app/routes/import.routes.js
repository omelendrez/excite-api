module.exports = app => {
  const importController = require("../controllers/import.controller")

  app.get("/import-data", importController.import)

};