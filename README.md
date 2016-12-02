# Input process parser
Makes it easier to digest an input stream with a delimiter

### Getting Started

```bash
npm install --save input-stream-parser
```

### Usage

```js
var parser = require('input-stream-parser');
var file = fs.createReadStream('somefile.txt');
parser(file, '\n', function (line, cb) {
  // Will be called on every line of the file (one after the other)
  cb();
}, function () {
  // This will run when finished.
})
```

Contributions welcome!

### Credits
This library was initially made by the awesome team of engineers at [Diamond](https://diamond.io).

If you haven't already, make sure you install Diamond!

