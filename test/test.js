/*!
 * normalize <https://github.com/jonschlinkert/normalize>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Normalize = require('..');
var normalize = new Normalize();
var _ = require('lodash');


describe('single templates', function () {
  describe('.toObjectKey()', function () {
    it('should use the `path` property as the object key:', function () {
      var actual = normalize.toObjectKey({path: 'a/b/c.md'});
      _.keys(actual)[0].should.equal('a/b/c.md');
    });

    it('should preserve existing `path` property when object key is added:', function () {
      var actual = normalize.toObjectKey({path: 'a/b/c.md'});
      actual['a/b/c.md'].path.should.equal('a/b/c.md');
    });

    it('should add a `path` property based on the object key:', function () {
      var actual = normalize.toObjectKey({'a/b/c.md': {path: 'a/b/c.md'}});
      console.log(actual)
      // _.keys(actual)[0].should.equal('a/b/c.md');
    });
  });

  // it('should normalize ', function () {
  //   var actual = normalize.fileObject({path: 'a/b/c.md', content: 'this is content', data: {a: 'b'}, arbitrary: 'foo'});
  //   console.log(actual)
  //   // actual.should.equal('foo');
  //   // actual.should.have.property('bar');
  // });
});


// describe('normalize', function () {
// });



// var a = {name: 'test-layout-a', data: {title: 'test-layout-a'}, content: 'Test layout A content', ext: '.hbs'};
// var a2 = {foo: 'test-layout-a2', data: {title: 'test-layout-a2'}, content: 'Test layout A2 content', ext: '.hbs'};
// var b = {
//   'test-layout-b': {data: {title: 'test-layout-b'}, content: 'Test layout B content', layout: 'foo.md'}
// };
// var c = {path: 'test-layout-c', data: {title: 'test-layout-c'}, content: 'Test layout C content', layout: 'foo.md'};
// var c2 = {path: 'test-layout-d', data: {title: 'test-layout-d'}, content: 'Test layout D content', layout: 'foo.md'};
// var c3 = {path: 'test-layout-e', data: {title: 'test-layout-e'}, content: 'Test layout E content', layout: 'foo.md'};
// var d = {
//   zero1: {one: {'test-layout-f': {data: {title: 'test-layout-f'}, content: 'Test layout F content', layout: 'foo.md'}}},
//   zero2: {one: {'test-layout-g': {data: {title: 'test-layout-g'}, content: 'Test layout G content', layout: 'foo.md'}}},
//   zero3: {one: {'test-layout-h': {data: {title: 'test-layout-h'}, content: 'Test layout H content', layout: 'foo.md'}}},
//   zero4: {one: {'test-layout-i': {data: {title: 'test-layout-i'}, content: 'Test layout I content', layout: 'foo.md'}}},
// };
// var e = {
//   'test-page-a': {data: {title: 'test-page-a'}, content: 'Test page A content', ext: '.hbs'},
//   'test-page-b': {data: {title: 'test-page-b'}, content: 'Test page B content', ext: '.hbs'}
// };

// var a_exp = {data: {title: 'test-layout-d'}, content: 'Test layout D content', layout: 'foo.md'};
// var b_exp = {layout: 'foo.md'};
// var c_exp = {path: 'test-layout-c', data: {title: 'test-layout-d'}, content: 'Test layout D content', layout: 'foo.md'};
// var d_exp = {path: 'test-layout-c', layout: 'foo.md'};


// var normalize = new Normalize();

// console.log(normalize.siftProps(a))
// console.log(normalize.objectLength(c))
// console.log('missing:', normalize.missingKeys(a_exp))
// console.log('missing:', normalize.missingKeys(b_exp))
// console.log('missing:', normalize.missingKeys(c_exp))
// console.log('missing:', normalize.missingKeys(d_exp))
// console.log('root:', normalize.rootKeys(a_exp))
// console.log('root:', normalize.rootKeys(b_exp))
// console.log('root:', normalize.rootKeys(c_exp))
// console.log('root:', normalize.rootKeys(d_exp))

// normalize.fileObject(a);
// normalize.fileObject(b);
// normalize.fileObject(c);
// normalize.fileObject(c2);
// normalize.fileObject(c3);
// normalize.fileObject(d);
// normalize.fileObject(e);
// normalize.fileObject(d_exp);

// console.log(normalize)
// // _.forOwn(normalize.normalize, function (value, key) {
// //   console.log(value)
// //   console.log(normalize.ensureContentKey(_.keys(value)))
// // })

// var a = {name: 'test-layout-a', data: {title: 'test-layout-a'}, content: 'Test layout A content', ext: '.hbs'};

// var b = {
//   'test-layout-b': {data: {title: 'test-layout-a'}, content: 'Test layout A content', layout: 'foo.md'}
// };

// console.log(utils.siftProps(a))
// console.log(utils.detectMissing(a))

