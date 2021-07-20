module.exports = (app) => {
  const controller = require("../controllers/controller.js");
  const model = "clientes";
  const url = "clientes";

  app.post(`/${url}`, controller.create(model));

  app.get(`/${url}`, controller.findAll(model));

  app.get(
    `/${url}-activos/:id`,
    controller.findAllByParentId(`${model}-activos`)
  );

  app.get(`/${url}/:id/tipos`, controller.findAllByParentId(`${model}-tipos`));

  app.post(`/${url}/tipos`, controller.create("cliente1"));
  app.get(`/${url}/tipos/:id`, controller.findOne("cliente1"));
  app.put(`/${url}/tipos/:id`, controller.update("cliente1"));
  app.delete(`/${url}/tipos/:id`, controller.delete("cliente1"));

  app.get(
    `/${url}/:id/remitos`,
    controller.findAllByParentId(`${model}-remitos`)
  );

  app.get(
    `/${url}/:id/saldos`,
    controller.findAllByParentId(`${model}-saldos`)
  );

  app.get(`/${url}/:id`, controller.findOne(model));

  app.put(`/${url}/:id`, controller.update(model));

  app.delete(`/${url}/:id`, controller.delete(model));

  app.delete(`/${url}`, controller.deleteAll(model));
};
