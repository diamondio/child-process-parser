var assert = require('assert');
var cp = require('../lib/child-process-parser');

describe('Basic Tests', function() {
  it('Echo Test', function (done) {
    var word_list = [];
    cp(['echo', 'one', '2', 'three', '4'], ' ', function (word) {
      word_list.push(word);
    }, function (eCode) {
      assert.equal(eCode, 0);
      assert.deepEqual(word_list, ['one', '2', 'three', '4\n']);
      done();
    });
  });
});
