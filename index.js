var cp = require('child_process');
var Queue = require('fastqueue');

module.exports = function (input, delimiter, consumer, cb) {
  var queue = new Queue;
  var closed = false;
  var processing = false;
  var chunk = '';

  var resume = function () {
    if (queue.length > 0) {
      next();
    } else if (closed) {
      (typeof cb === "function") && cb();
    } else {
      input.resume();
    }
  }
  var next = function () {
    if (processing) return;
    var entry = undefined;
    while (entry === undefined && queue.length > 0) {
      entry = queue.shift();
    }
    if (entry === undefined) return resume();
    processing = true;
    consumer(entry, function () {
      processing = false;
      resume();
    });
  }

  input.on('data', (data) => {
    input.pause();
    chunk += `${data}`;
    var entries = chunk.split(delimiter);
    chunk = entries[entries.length - 1];
    for (var i = 0; i < entries.length - 1; i++) {
      queue.push(entries[i]);
    }
    next();
  });

  input.on('close', () => {
    if (chunk.length > 0) {
      queue.push(chunk);
    }
    closed = true;
    resume();
  });
}