var utils = require('./');


var a = {name: 'test-layout-a', data: {title: 'test-layout-a'}, content: 'Test layout A content', ext: '.hbs'};

var b = {
  'test-layout-b': {data: {title: 'test-layout-a'}, content: 'Test layout A content', layout: 'foo.md'}
};



// console.log(utils.siftProps(a))
// console.log(utils.detectMissing(a))

