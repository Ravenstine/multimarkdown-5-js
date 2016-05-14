var gulp        = require('gulp');
var shell       = require('gulp-shell');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var fs          = require('fs');
var concat      = require('gulp-concat');
var iife        = require('gulp-iife');
var runSequence = require('run-sequence');

gulp.task('clean', shell.task(["rm -rf tmp/multimarkdown-5"]));

gulp.task('update-mmd-src', shell.task([[
  'rm -rf tmp/multimarkdown-5',
  'git clone https://github.com/fletcher/MultiMarkdown-5.git tmp/multimarkdown-5',
  'cd tmp/multimarkdown-5',
  'git submodule update --init --recursive',
  'cp tools/version.h src/version.h'
].join("\n")]));

gulp.task('fix-strtok', function(){
  if(!(/^win/.test(process.platform))){
    // delete strtok.c unless we are on windows
    fs.unlinkSync('tmp/multimarkdown-5/src/strtok.c');
  }
});

gulp.task('build-libmultimarkdown', shell.task([[
    'cd tmp/multimarkdown-5',
    "make build/parser.o",
    "emcc -O1 src/*.c -o ../../tmp/libMultiMarkdown.js -s EXPORTED_FUNCTIONS=\"['_mmd_version', '_markdown_to_string']\" -s OUTLINING_LIMIT=10000 -s TOTAL_MEMORY=268435456 -s ASSERTIONS=1",
].join('\n')]));

gulp.task('compile', function(){
  return gulp.src(['tmp/libMultiMarkdown.js', 'src/multimarkdown.js'])
    .pipe(concat('multimarkdown.js'))
    .pipe(iife())
    .pipe(gulp.dest('build'));
})

gulp.task('browserify', function(){
  return browserify()
    .require("./build/multimarkdown.js", {expose: "multimarkdown-js"})
    .bundle()
    .pipe(source('multimarkdown.js'))
    .pipe(gulp.dest('build/browser'));  
})

gulp.task('build', function() {
  runSequence('clean', 'update-mmd-src', 'fix-strtok', 'build-libmultimarkdown', 'compile', 'browserify');
});