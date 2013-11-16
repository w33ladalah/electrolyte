var Factory = require('./component/factory')
  , Constructor = require('./component/constructor')
  , Prototype = require('./component/prototype');


function Container() {
  this._o = {};
}

Container.prototype.create = function(id) {
  var comp = this._o[id];
  if (!comp) { throw new Error("Cannot find component '" + id + "'"); }
  
  return comp.create(this);
}

Container.prototype.factory = function(id, dependencies, fn) {
  if (typeof dependencies == 'function') {
    fn = dependencies;
    dependencies = [];
  }
  this.register(new Factory(id, dependencies, fn));
}

Container.prototype.constructor = function(id, dependencies, ctor) {
  if (typeof dependencies == 'function') {
    ctor = dependencies;
    dependencies = [];
  }
  this.register(new Constructor(id, dependencies, ctor));
}

Container.prototype.prototype = function(id, proto) {
  this.register(new Prototype(id, [], proto));
}

Container.prototype.register = function(comp) {
  this._o[comp.id] = comp;
}

module.exports = Container;