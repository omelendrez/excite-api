module.exports = app => {
  require("./customer.routes")(app)
  require("./import.routes")(app)
}