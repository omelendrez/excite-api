module.exports = app => {
  const controller = require("../controllers/controller.js")
  const model = 'facturas'
  const url = 'facturas'

  app.get(`/${url}/:id`, controller.findAllByParentId(model))
  app.get(`/${url}/:id/items`, controller.findAllByParentId(`${model}-items`))

  app.post(`/${url}/:id`, controller.compute(model))

};
