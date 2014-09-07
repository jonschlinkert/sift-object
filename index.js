var chalk = require('chalk');
var _ = require('lodash');

var expected = {
  root: ['path', 'content', 'data'],
  opts: ['isOpts'],
};

function Normalize(obj) {
  this.cache = obj || {};
}
Normalize.prototype.set = function (key, value) {
  this.cache[key] = value;
  return this;
};

Normalize.prototype.get = function(key) {
  return this.cache[key];
};

Normalize.prototype.objectLength = function(o) {
  return _.keys(o).length;
};

Normalize.prototype.extend = function() {
  var args = [].slice.call(arguments);

  if (typeof args[0] === 'string') {
    var o = this.get(args[0]) || {};
    o = _.extend.apply(_, [o].concat(_.rest(args)));
    this.set(args[0], o);
    return this;
  }
  _.extend.apply(_, [this.cache].concat(args));
  return this;
};

Normalize.prototype.fileObject = function fileObject(o) {
  return _.reduce(o, function (acc, value, key, obj) {
    if (this.rootKeys(obj).length > 1) {
      this.extend(this.toObjectKey(obj));
    } else if (this.rootKeys(value).length > 1) {
      this.cache[key] = value;
    } else if (typeof value === 'object') {
      this.extend(this.fileObject(value));
    }
    return this.cache;
  }.bind(this), {});
};


Normalize.prototype.toObjectKey = function(o) {
  var name = o.path || o.name;
  var obj = _.values(o);
  var acc = {};

  if (name) {
    acc[name] = o;
  } else if (_.filter(obj, 'path').length > 0) {
    return o;
  } else {
    var msg = 'template objects must have a `name` or `path` key:';
    throw new Error(
      console.log(chalk.red('%s'), msg) +
      console.log(chalk.yellow('%j'), o)
    );
  }
  return acc;
};

// Normalize.prototype.isOptions = function(o, props) {
//   var keys = ['isOpts'].concat(props || []);
//   var file = _.pick(o, keys);
//   var non = _.omit(o, keys);
//   return file;
// };

Normalize.prototype.siftProps = function(o, props) {
  var keys = expected.root.concat(props || []);
  var file = _.pick(o, keys);
  var non = _.omit(o, keys);

  file.data = _.extend({}, non, o.data);
  return file;
};


/**
 * Returns an array of root keys that **exist**
 * on the given object.
 *
 * @param  {Object} `o`
 * @param  {Array} `props`
 * @return {Array}
 */

Normalize.prototype.rootKeys = function(o, props) {
  var keys = expected.root.concat(props || []);
  return _.intersection(keys, _.keys(o));
};


/**
 * Returns an array of root keys that are **missing**
 * on the given object.
 *
 * @param  {Object} `o`
 * @param  {Array} `props`
 * @return {Array}
 */

Normalize.prototype.missingKeys = function(o, props) {
  var root = expected.root.concat(props || []);
  return _.difference(root, _.keys(o));
};

Normalize.prototype.ensurePathKey = function(arr) {
  return _.contains(arr, 'path') || false;
};

Normalize.prototype.ensureDataKey = function(arr) {
  return _.contains(arr, 'data') || false;
};

Normalize.prototype.ensureContentKey = function(arr) {
  return _.contains(arr, 'content') || false;
};


module.exports = Normalize;