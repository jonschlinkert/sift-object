var chalk = require('chalk');
var _ = require('lodash');

var utils = module.exports;

var root = ['path', 'content', 'data'];

var a = {name: 'test-layout-a', data: {title: 'test-layout-a'}, content: 'Test layout A content', ext: '.hbs'};
var a2 = {foo: 'test-layout-a', data: {title: 'test-layout-a'}, content: 'Test layout A content', ext: '.hbs'};
var b = {
  'test-layout-b': {data: {title: 'test-layout-b'}, content: 'Test layout B content', layout: 'foo.md'}
};
var c = {path: 'test-layout-c', data: {title: 'test-layout-d'}, content: 'Test layout D content', layout: 'foo.md'};
var d = {
  'test-layout-e': {data: {title: 'test-layout-e'}, content: 'Test layout E content', layout: 'foo.md'},
  zero1: {one: {'test-layout-f': {data: {title: 'test-layout-f'}, content: 'Test layout F content', layout: 'foo.md'}}},
  'test-layout-g': {data: {title: 'test-layout-g'}, content: 'Test layout G content', layout: 'foo.md'},
  zero2: {one: {'test-layout-h': {data: {title: 'test-layout-h'}, content: 'Test layout H content', layout: 'foo.md'}}},
  zero3: {one: {'test-layout-i': {data: {title: 'test-layout-i'}, content: 'Test layout I content', layout: 'foo.md'}}},
};

var siftProps = function(o, props) {
  var keys = root.concat(props || []);
  var non = _.omit(o, keys);
  var file = _.pick(o, keys);
  file.data = _.extend({}, non, o.data);
  return file;
};


var detectMissing = function(o, props) {
  var req = root.concat(props || []);
  return _.difference(req, _.keys(o));
};


var expectedKeys = function(o, props) {
  var req = root.concat(props || []);
  return _.intersection(req, _.keys(o));
};

var objectLength = function(o) {
  return _.keys(o).length;
};


var renameObject = function(acc, o) {
  var name = o.path || o.name;
  if (name) {
    acc[name] = o;
  } else {
    var msg = 'template objects must have a `name` or `path` key:';
    throw new Error(
      console.log(chalk.red('%s'), msg) +
      console.log(chalk.yellow('%j'), o)
    );
  }
  return acc;
};


var fileObject = function fileObject(o, props) {
  return _.reduce(o, function (acc, value, key, obj) {
    if (expectedKeys(obj).length > 1) {
      acc = renameObject(acc, obj);
    } else if (expectedKeys(value).length > 1) {
      acc[key] = value;
    } else {
      _.extend(acc, fileObject(value));
    }
    return acc;
  }, {});
};



function Cache(obj) {
  this.cache = obj || {};
}
Cache.prototype.set = function (key, value) {
  this.cache[key] = value;
  return this;
};
Cache.prototype.get = function(key) {
  return this.cache[key];
};
Cache.prototype.extend = function() {
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

Cache.prototype.fileObject = function fileObject(o, props) {
  return _.reduce(o, function (acc, value, key, obj) {
    if (expectedKeys(obj).length > 1) {
      this.extend(renameObject(acc, obj));
    } else if (expectedKeys(value).length > 1) {
      this.cache[key] = value;
    } else {
      this.extend(this.fileObject(value));
    }
    return this.cache;
  }.bind(this), {});
};


var cache = new Cache();

// cache.siftProps(a)
// cache.detectMissing(a)
// cache.objectLength(c)
// cache.expectedKeys(c)

cache.fileObject(a)
cache.fileObject(b)
cache.fileObject(c)
cache.fileObject(d)

console.log(cache.cache)