methods.forEach(function(method) {
  app[method] = function(path, ...handlers) {
    this.lazyrouter();
    const route = this._router.route(path);
    route[method](...handlers);
    return this;
  };
});

app.listen = function(...args) {
  const server = http.createServer(this);
  return server.listen(...args);
};

app.handle = function(req, res, out) {
  this._router.handle(req, res, out);
};
