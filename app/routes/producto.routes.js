module.exports = (app) => {
  const controller = require("../controllers/controller.js");
  const model = "producto";
  const url = "productos";

  app.post(`/${url}`, controller.create(model));

  app.get(`/${url}`, controller.findAll(model));

  app.get(`/${url}-activos`, controller.findAll(`${model}-activos`));

  app.get(
    `/${url}-ajustes/:id`,
    controller.findAllByParentId(`${model}-ajustes`)
  );

  app.get(
    `/${url}-ventas/:id`,
    controller.findAllByParentId(`${model}-ventas`)
  );

  app.get(
    `/${url}-ventas-subtipo`,
    controller.findAll(`${model}-ventas-subtipo`)
  );

  app.get(`/${url}/:id`, controller.findOne(model));

  app.put(`/${url}/:id`, controller.update(model));

  app.delete(`/${url}/:id`, controller.delete(model));

  app.delete(`/${url}`, controller.deleteAll(model));
};
