var assert = require('assert');
var cp = require('child_process');
var cpp = require('../');

describe('Basic Tests', function() {
  it('Echo Test', function (done) {
    var word_list = [];
    var proc = cp.spawn('echo', ['one', '2', 'three', '4']);
    cpp(proc.stdout, ' ', function (word, cb) {
      word_list.push(word);
      cb();
    }, function (err) {
      assert.ok(!err);
      assert.deepEqual(word_list, ['one', '2', 'three', '4\n']);
      done();
    });
  });

  it('Rand Test', function (done) {
    var word_list = [];
    var proc = cp.spawn('bash', [__dirname + '/rand.sh', '10']);
    cpp(proc.stdout, '\n', function (word, cb) {
      setTimeout(cb, 1);
    }, function (err) {
      done();
    });
  });
});
