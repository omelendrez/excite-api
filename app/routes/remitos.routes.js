module.exports = (app) => {
  const controller = require("../controllers/controller.js");
  const model = "remitos";
  const url = "remitos";

  app.post(`/${url}`, controller.create(model));

  app.get(`/${url}`, controller.findAll(model));

  app.get(`/${url}/deudores`, controller.findAll(`${model}-deudores`));

  app.get(`/${url}/:id`, controller.findOne(model));

  app.get(`/${url}/:id/items`, controller.findAllByParentId(`${model}-items`));

  app.get(`/${url}/:id/items/compact`, controller.findAllByParentId(`${model}-compact`));

  app.post(`/${url}/items`, controller.create("remiitem"));

  app.get(`/${url}/items/:id`, controller.findOne("remiitem"));

  app.put(`/${url}/:id`, controller.update(model));

  app.put(`/${url}/items/:id`, controller.update("remiitem"));

  app.delete(`/${url}/:id`, controller.delete(model));

  app.delete(`/${url}/items/:id`, controller.delete("remiitem"));

  app.delete(`/${url}`, controller.deleteAll(model));
};
