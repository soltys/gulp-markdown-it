# gulp-markdown-it [![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url]


> Markdown-it plugin for [gulp](http://gulpjs.com/) 3.

## Usage

First, install `gulp-markdown-it` as a development dependency:

```shell
npm install --save-dev @psoltys/gulp-markdown-it
```

Then, add it to your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var markdown-it = require('gulp-markdown-it');

gulp.task('default', function () {
    gulp.src('./src/*.ext')
        .pipe(markdown-it({msg: 'More Coffee!'}))
        .pipe(gulp.dest("./dist"));
});
```

## Options `markdown-it(opt)`

See the markdown-it [Api docs](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) for more details.

## opt.preset

Type: `String` can be "commonmark", "zero" or "default"
Default: `default`

## opt.options

Type: `Object`
Default: `{}`

## opt.plugins

Type: `Object`
Default: `[]`

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) © []()

[npm-url]: https://www.npmjs.com/package/@psoltys/gulp-markdown-it
[npm-image]: https://img.shields.io/npm/v/gulp-markdown-it.svg

[travis-url]: http://travis-ci.org/soltys/gulp-markdown-it
[travis-image]: https://secure.travis-ci.org/soltys/gulp-markdown-it.svg?branch=master

[coveralls-url]: https://coveralls.io/r/soltys/gulp-markdown-it
[coveralls-image]: https://img.shields.io/coveralls/soltys/gulp-markdown-it.svg

[depstat-url]: https://david-dm.org/soltys/gulp-markdown-it
[depstat-image]: https://david-dm.org/soltys/gulp-markdown-it.svg

[devdepstat-url]: https://david-dm.org/soltys/gulp-markdown-it#info=devDependencies
[devdepstat-image]: https://david-dm.org/soltys/gulp-markdown-it/dev-status.svg
