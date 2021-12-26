module.exports = app => {
  const conversionController = require("../controllers/conversion.controller")
  app.get("/data-conversion", conversionController.convert)
}
