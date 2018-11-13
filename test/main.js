var ERRS, PLUGIN_NAME, createFakeFile, gutil, markdownIt, path, should;

should = require('should');

gutil = require('gulp-util');

path = require('path');

// const
PLUGIN_NAME = 'gulp-markdown-it';

ERRS = {
    MSG: 'msg param needs to be a string, dummy',
    STREAM: 'stream content is not supported',
    PRESET: "Error: Wrong `markdown-it` preset \"wrong\", check name"
};

// SUT
markdownIt = require('../');

createFakeFile = function (content) {
    var file;
    content = content != null ? content : '# Headline\n' + 'Simple Paragraph, but **Strong**';
    file = new gutil.File({
        path: 'test/fixture/sample.md',
        cwd: './test/',
        base: './test/fixture/',
        contents: new Buffer(content)
    });
    return file;
};

describe('gulp-markdown-it', function () {
    return describe('markdownIt()', function () {
        it('should pass through empty files', function (done) {
            var dataCounter, fakeFile, stream;
            dataCounter = 0;
            fakeFile = createFakeFile();
            fakeFile.contents = null;
            stream = markdownIt();
            stream.on('data', function (newFile) {
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.not.exist(newFile.contents);
                newFile.path.should.equal(fakeFile.path);
                return ++dataCounter;
            });
            stream.once('end', function () {
                dataCounter.should.equal(1);
                return done();
            });
            stream.write(fakeFile);
            return stream.end();
        });
        it('should pass through a file', function (done) {
            var dataCounter, fakeFile, stream;
            dataCounter = 0;
            fakeFile = createFakeFile();
            stream = markdownIt();
            stream.on('data', function (newFile) {
                should.exist(newFile);
                should.exist(newFile.path);
                should.exist(newFile.relative);
                should.exist(newFile.contents);
                newFile.path.should.equal('test/fixture/sample.html');
                newFile.relative.should.equal('sample.html');
                newFile.contents.toString().should.equal('<h1>Headline</h1>\n<p>Simple Paragraph, ' + 'but <strong>Strong</strong></p>\n');
                return ++dataCounter;
            });
            stream.once('end', function () {
                dataCounter.should.equal(1);
                return done();
            });
            stream.write(fakeFile);
            return stream.end();
        });
        it('should pass through two files', function (done) {
            var dataCounter, fakeFile, fakeFile2, stream;
            dataCounter = 0;
            fakeFile = createFakeFile();
            fakeFile2 = createFakeFile();
            stream = markdownIt();
            stream.on('data', function (newFile) {
                return ++dataCounter;
            });
            stream.once('end', function () {
                dataCounter.should.equal(2);
                return done();
            });
            stream.write(fakeFile);
            stream.write(fakeFile2);
            return stream.end();
        });
        it('should use options', function (done) {
            var dataCounter, fakeFile, stream;
            dataCounter = 0;
            fakeFile = createFakeFile('(c)');
            stream = markdownIt({
                options: {
                    typographer: true
                }
            });
            stream.on('data', function (newFile) {
                ++dataCounter;
                return newFile.contents.toString().should.equal('<p>©</p>\n');
            });
            stream.once('end', function () {
                dataCounter.should.equal(1);
                return done();
            });
            stream.write(fakeFile);
            return stream.end();
        });
        it('should optionally activate plugins', function (done) {
            var fakeFile, stream;
            fakeFile = createFakeFile('[X] check');
            stream = markdownIt({
                plugins: ['markdown-it-checkbox']
            });
            stream.on('data', function (newFile) {
                newFile.contents.toString().should.equal('<p><input type="checkbox" id="checkbox0" checked="true">' + '<label for="checkbox0">check</label></p>\n');
                return done();
            });
            stream.write(fakeFile);
            return stream.end();
        });
        it('should optionally use plugin options', function (done) {
            var fakeFile, stream;
            fakeFile = createFakeFile('[X] check');
            stream = markdownIt({
                plugins: [
                    [
                        'markdown-it-checkbox',
                        {
                            divWrap: true
                        }
                    ]
                ]
            });
            stream.on('data', function (newFile) {
                newFile.contents.toString().should.equal('<p><div class="checkbox">' + '<input type="checkbox" id="checkbox0" checked="true">' + '<label for="checkbox0">check</label></div></p>\n');
                return done();
            });
            stream.write(fakeFile);
            return stream.end();
        });
        return describe('errors', function () {
            describe('are thrown', function () {
                return it('if configuration is just wrong', function (done) {
                    var e, stream;
                    try {
                        return stream = markdownIt({
                            preset: 'wrong'
                        });
                    } catch (error) {
                        e = error;
                        should(e.toString()).equal(ERRS.PRESET);
                        return done();
                    }
                });
            });
            return describe('are emitted', function () {
                return it('if file content is stream', function (done) {
                    var fakeFile, stream;
                    fakeFile = new gutil.File({
                        path: './test/fixture/file.js',
                        cwd: './test/',
                        base: './test/fixture/',
                        contents: process.stdin
                    });
                    stream = markdownIt();
                    stream.on('error', function (e) {
                        should(e.plugin).equal(PLUGIN_NAME);
                        should(e.message).equal(ERRS.STREAM);
                        return done();
                    });
                    stream.write(fakeFile);
                    return stream.end();
                });
            });
        });
    });
});

