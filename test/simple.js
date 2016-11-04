var assert = require('assert');
var cp = require('../lib/child-process-parser');

var sleep = require('sleep');

describe('Basic Tests', function() {
  it('Echo Test', function (done) {
    var word_list = [];
    cp(['echo', 'one', '2', 'three', '4'], ' ', function (word, cb) {
      word_list.push(word);
      cb();
    }, function (eCode) {
      assert.equal(eCode, 0);
      assert.deepEqual(word_list, ['one', '2', 'three', '4\n']);
      done();
    });
  });

  it('Rand Test', function (done) {
    var word_list = [];
    cp(['bash', './rand.sh', '10'], '\n', function (word, cb) {
      setTimeout(cb, 1);
    }, function (eCode) {
      done();
    });
  });
});
