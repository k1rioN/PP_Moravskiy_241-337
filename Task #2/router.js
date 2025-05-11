proto.route = function(path) {
  const route = new Route(path);
  const layer = new Layer(path, {}, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

proto.handle = function(req, res, out) {
  const stack = this.stack;
  let idx = 0;

  function next() {
    const path = getPathname(req);
    let layer, match, route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = layer.match(path);
      route = layer.route;

      if (match === true && route) {
        route.stack[0].handle_request(req, res, next);
      }
    }
  }

  next();
};

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = path;
}

Layer.prototype.match = function(path) {
  return this.path === path;
};

Layer.prototype.handle_request = function(req, res, next) {
  try {
    this.handle(req, res, next);
  } catch (err) {
    console.error(err);
  }
};
