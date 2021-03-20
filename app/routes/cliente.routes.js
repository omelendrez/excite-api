module.exports = app => {
  const controller = require("../controllers/controller.js")
  const model = 'clientes'
  const url = 'clientes'

  app.post(`/${url}`, controller.create(model))

  app.get(`/${url}`, controller.findAll(model))

  app.get(`/${url}/:id`, controller.findOne(model))

  app.put(`/${url}/:id`, controller.update(model))

  app.delete(`/${url}/:id`, controller.delete(model))

  app.delete(`/${url}`, controller.deleteAll(model))

};