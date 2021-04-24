module.exports = (app) => {
  const controller = require("../controllers/controller.js");
  const model = "tipo";
  const url = "tipos";

  app.post(`/${url}`, controller.create(model));

  app.get(`/${url}`, controller.findAll(model));

  app.get(`/${url}-activos`, controller.findAll(`${model}-activos`));

  app.get(
    `/${url}-subtipos/:id`,
    controller.findAllByParentId(`${model}-subtipos`)
  );

  app.get(`/${url}/:id`, controller.findOne(model));

  app.put(`/${url}/:id`, controller.update(model));

  app.delete(`/${url}/:id`, controller.delete(model));

  app.delete(`/${url}`, controller.deleteAll(model));
};
