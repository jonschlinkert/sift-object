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


/**
 * Roughly normalize an object to the structure we need.
 * This method does very light property checking, its main
 * purpose is to get objects formatted the same way so that
 * other methods can do the scrubbing.
 *
 * @param  {Object} `o` Various object structures.
 * @return {Object} Returns a roughly normalized object.
 */

Normalize.prototype.fileObject = function fileObject(o, options) {
  var opts = _.extend({recurse: false}, options);

  return _.reduce(o, function (acc, value, key, obj) {
    if (this.rootKeys(obj).length > 1) {
      this.extend(this.toObjectKey(obj));
    } else if (this.rootKeys(value).length > 1) {
      this.cache[key] = value;
    } else if (typeof value === 'object' && opts.recurse) {
      this.extend(this.fileObject(value));
    }
    return this.cache;
  }.bind(this), {});
};


Normalize.prototype.toSpec = function toSpec(o) {

};


Normalize.prototype.toObjectKey = function (o) {
  return _.reduce(o, function (acc, value, key, obj) {

    if (!/path|[\.\\\/]/.test(key) && !value.hasOwnProperty('path')) {
      console.log(acc)
      var msg = 'template objects must have a key defined as a path or `path` property:';
      throw new Error(console.log(chalk.red('%s'), msg) + console.log(chalk.yellow('%j'), o));
    }

    if (key === 'path') {
      acc[value] = obj;
    } else if (!obj.hasOwnProperty('path')) {
      value.path = value.path || key;
      acc = obj;
    }


    return acc;
  }, {});
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