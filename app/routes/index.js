module.exports = app => {
  require("./cliente.routes")(app)
  require("./import.routes")(app)
}