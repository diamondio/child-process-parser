var cp = require('child_process');

module.exports = function (command, delimeter, consumer, cb) {
  var cmd = [].concat(command);
  var spawned_process = cp.spawn(cmd.shift(), cmd);

  var temp_string = '';

  spawned_process.stdout.on('data', (data) => {
    temp_string += `${data}`;
    if (temp_string.indexOf(delimeter) > -1) {
      var splitEntries = temp_string.split(delimeter);
      for (var i = 0; i < splitEntries.length - 1; i++) {
        consumer(splitEntries[i]);
      }
      temp_string = splitEntries[splitEntries.length - 1];
    }
  });

  spawned_process.on('close', (code) => {
    if (temp_string.length > 0) {
      consumer(temp_string);
    }
    cb(code)
  });
}
