/*!
 * normalize <https://github.com/jonschlinkert/normalize>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Normalize = require('./');
var normalize = new Normalize();
var _ = require('lodash');


describe('single templates', function () {
  describe('.toObjectKey()', function () {
    it('should use the `path` property as the object key:', function () {
      var obj = normalize.toObjectKey({path: 'a/b/c.md'});
      _.keys(obj)[0].should.equal('a/b/c.md');
    });

    it('should preserve existing `path` property when object key is added:', function () {
      var obj = normalize.toObjectKey({path: 'a/b/c.md'});
      obj['a/b/c.md'].path.should.equal('a/b/c.md');
    });

    it('should add a `path` property based on the object key:', function () {
      var obj = normalize.toObjectKey({'a/b/c.md': {path: 'a/b/c.md'}});
      _.keys(obj)[0].should.equal('a/b/c.md');
    });

    it('should preserve original values when `path` property and key are defined:', function () {
      var obj = normalize.toObjectKey({'a/b/c.md': {path: 'd/e/f.md'}});
      _.keys(obj)[0].should.equal('a/b/c.md');
      obj['a/b/c.md'].path.should.equal('d/e/f.md');
    });
  });


  describe('.fileObject()', function () {
    it('should use the `path` property as the object key:', function () {
      var obj = {path: 'a.md', data: {title: 'a'}, content: 'A content', ext: '.hbs'};
      var o = normalize.toObjectKey(obj);
      o.should.have.property('a.md');
      o['a.md'].should.have.property('path');
      o['a.md'].should.have.property('data');
      o['a.md'].should.have.property('content');
      o['a.md'].should.have.property('ext');
    });

    it('should use the key:', function () {
      var obj = {'a.html': {data: {title: 'a'}, content: 'A content', ext: '.hbs'}};
      var o = normalize.toObjectKey(obj);
      o.should.have.property('a.html');
      o['a.html'].should.have.property('path');
      o['a.html'].should.have.property('data');
      o['a.html'].should.have.property('content');
      o['a.html'].should.have.property('ext');
    });

    it('should preserve object key and `path` property:', function () {
      var obj = {'a.js': {path: 'foo.js', data: {title: 'a'}, content: 'A content', ext: '.hbs'}};
      var o = normalize.toObjectKey(obj);
      o.should.have.property('a.js');
      o['a.js'].should.have.property('path');
      o['a.js'].path.should.equal('foo.js');
    });

    it.skip('should throw an error when key and path are not formatted properly:', function () {
      var obj = {data: {title: 'a'}, content: 'A content', ext: '.hbs'};
      var o = normalize.toObjectKey(obj);
      // function error() {
      //   throw new Error();
      // }
      // error.should.throw();
    });
  });
});


// var a = {path: 'a', data: {title: 'a'}, content: 'A content', ext: '.hbs'};
// var a2 = {foo: 'a2', data: {title: 'a2'}, content: 'A2 content', ext: '.hbs'};
// var b = {
//   'b': {data: {title: 'b'}, content: 'B content', layout: 'foo.md'}
// };
// var c = {path: 'c', data: {title: 'c'}, content: 'C content', layout: 'foo.md'};
// var c2 = {path: 'd', data: {title: 'd'}, content: 'D content', layout: 'foo.md'};
// var c3 = {path: 'e', data: {title: 'e'}, content: 'E content', layout: 'foo.md'};
// var d = {
//   zero1: {one: {'f': {data: {title: 'f'}, content: 'F content', layout: 'foo.md'}}},
//   zero2: {one: {'g': {data: {title: 'g'}, content: 'G content', layout: 'foo.md'}}},
//   zero3: {one: {'h': {data: {title: 'h'}, content: 'H content', layout: 'foo.md'}}},
//   zero4: {one: {'i': {data: {title: 'i'}, content: 'I content', layout: 'foo.md'}}},
// };
// var e = {
//   'test-page-a': {data: {title: 'test-page-a'}, content: 'Test page A content', ext: '.hbs'},
//   'test-page-b': {data: {title: 'test-page-b'}, content: 'Test page B content', ext: '.hbs'}
// };

// var a_exp = {data: {title: 'd'}, content: 'D content', layout: 'foo.md'};
// var b_exp = {layout: 'foo.md'};
// var c_exp = {path: 'c', data: {title: 'd'}, content: 'D content', layout: 'foo.md'};
// var d_exp = {path: 'c', layout: 'foo.md'};



// // console.log(normalize.siftProps(a))
// // console.log(normalize.objectLength(c))
// // console.log('missing:', normalize.missingKeys(a_exp))
// // console.log('missing:', normalize.missingKeys(b_exp))
// // console.log('missing:', normalize.missingKeys(c_exp))
// // console.log('missing:', normalize.missingKeys(d_exp))
// // console.log('root:', normalize.rootKeys(a_exp))
// // console.log('root:', normalize.rootKeys(b_exp))
// // console.log('root:', normalize.rootKeys(c_exp))
// // console.log('root:', normalize.rootKeys(d_exp))

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

// // var a = {path: 'a', data: {title: 'a'}, content: 'A content', ext: '.hbs'};

// // var b = {
// //   'b': {data: {title: 'a'}, content: 'A content', layout: 'foo.md'}
// // };

// // console.log(normalize.siftProps(a))
// // console.log(normalize.detectMissing(a))

