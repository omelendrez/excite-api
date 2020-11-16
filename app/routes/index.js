module.exports = app => {
  require("./cliente.routes")(app)
  require("./tipo.routes")(app)
  require("./import.routes")(app)
}