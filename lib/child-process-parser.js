var cp = require('child_process');
var async = require('async');

module.exports = function (command, delimeter, consumer, cb) {
  var cmd = [].concat(command);
  var spawned_process = cp.spawn(cmd.shift(), cmd);
  var pauseCount = 0;
  var workerQueue = new async.queue(consumer);

  var temp_string = '';

  spawned_process.stdout.on('data', (data) => {
    if (!pauseCount) spawned_process.stdout.pause();
    pauseCount++;
    temp_string += `${data}`;
    var doneCycle = function () {
      pauseCount--;
      if (!pauseCount);
      spawned_process.stdout.resume();
    }

    if (temp_string.indexOf(delimeter) === -1) return doneCycle();
    var splitEntries = temp_string.split(delimeter);
    temp_string = splitEntries[splitEntries.length - 1];
    if (splitEntries.length > 2) {
      for (var i = 0; i < splitEntries.length - 2; i++) {
        workerQueue.push(splitEntries[i]);
      }
    }
    workerQueue.push(splitEntries[splitEntries.length - 2], doneCycle);
  });

  spawned_process.on('close', (code) => {
    if (temp_string.length > 0) {
      workerQueue.push(temp_string);
    }
    if (workerQueue.length() === 0) return cb(code);
    workerQueue.drain = function () {
      cb(code);
    }
  });
}
