module.exports = (app) => {
  const controller = require("../controllers/controller.js");
  const model = "pagos";
  const url = "pagos";

  app.post(`/${url}`, controller.create(model));

  app.get(`/${url}`, controller.findAll(model));

  app.get(`/${url}/:id`, controller.findOne(model));

  app.put(`/${url}/:id`, controller.update(model));

  app.delete(`/${url}/:id`, controller.delete(model));

  app.delete(`/${url}`, controller.deleteAll(model));

  app.get(
    `/${url}/:id/remitos`,
    controller.findAllByParentId(`${model}-remitos`)
  );
  app.get(
    `/${url}/:id/valores`,
    controller.findAllByParentId(`${model}-valores`)
  );

  app.get(`/${url}/remitos/:id`, controller.findOne("pagos1"));
  app.put(`/${url}/remitos/:id`, controller.update("pagos1"));
  app.delete(`/${url}/remitos/:id`, controller.delete("pagos1"));

  app.get(`/${url}/valores/:id`, controller.findOne("pagos2"));
  app.put(`/${url}/valores/:id`, controller.update("pagos2"));
  app.delete(`/${url}/valores/:id`, controller.delete("pagos2"));
};
