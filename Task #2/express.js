exports = module.exports = createApplication;

function createApplication() {
  let app = function(req, res, next) {
    app.handle(req, res, next);
  };

  // Миксовать методы
  mixin(app, require('./app'), false);

  app.init();
  return app;
}