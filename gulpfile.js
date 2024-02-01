// Set Sourcemaps and learn to use it

// Q: What does all that do?
// A: Takes files from 'app' folder and builds HTML from Pug, CSS from SCSS, JS.
// Using BrowserSync+Watcher function to keep track of any change
// and auto-refresh page to display changes.

let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    // tinypng = require('gulp-tinypng-compress'),
    // sourcemaps = require('gulp-sourcemaps'),
    nu = require('gulp-html');

// Converts SCSS to CSS and writes sourcemaps to separate folder.
gulp.task('scss', function(){
  return gulp.src(['app/scss/**/*.scss'])
    // .pipe(sourcemaps.init())
    // .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write('./maps'))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))
    .pipe(gulp.dest('app'))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream: true}))
});

// builds external plugins CSS libraries used.
// You have to manually add path to plugin's CSS if there is any.
gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}));
});

// builds external plugins JS libraries used.
// You have to manually add path to plugin's JS if there is any.
gulp.task('js', function(){
  return gulp.src([
    'node_modules/lozad/dist/lozad.min.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    'node_modules/simple-parallax-js/dist/simpleParallax.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream: true}));
});
// watches for JS changes, reloads page if there was any.
gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}));
});

// watches for HTML changes, reloads page if there was any.
gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}));
});

// Builds HTML from Pug files.
gulp.task('pug', function(){
  return gulp.src('app/*.pug')
    .pipe(pug({
        pretty:true
      })
    )
    .pipe(gulp.dest('app'));
});

// Watches your development folder.
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

// Uncomment this to use tunneling, comment previous task.
// gulp.task('browser-sync', function(){
//   browserSync.init({
//       server: {
//           baseDir: "app/"
//       },
//       online: true,
//       tunnel: 'quin'
//   })
// });

gulp.task('nuValidity', function(){
  return gulp.src('app/*.html')
    .pipe(nu());
    // .pipe(gulp.dest());
});

// Watcher function.
gulp.task('watch', function(){
  gulp.watch(['app/*.pug', 'app/components/*.pug'], gulp.parallel('pug'));
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html', 'nuValidity'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});

// Deletes previous dist version to build following version safely.
gulp.task('clean', async function(){
  del.sync('dist');
});

// Building tasks.
gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/**/*.css')
    // .pipe(gulp.dest('dist/assets/css'));
    .pipe(gulp.dest('dist'));

  let BuildJs = gulp.src('app/assets/js/**/*.js')
    .pipe(gulp.dest('dist/assets/js'));
    
  let BuildFonts = gulp.src('app/assets/fonts/**/*.*')
    .pipe(gulp.dest('dist/assets/fonts'));

  let BuildImg = gulp.src('app/assets/img/**/*.*')
    // .pipe(tinypng({
    //   key: 'wT3gZYM1NgHS23Zr6np9RzTrN86d7tqz',
    //   sigFile: 'images/.tinypng-sigs',
    //   log: true
    // }))
    .pipe(gulp.dest('dist/assets/img'));   
});

// Defined series of tasks: cleans 'dist' folder and then builds your project.
// Launch command: 'guld build'
gulp.task('build', gulp.series('clean', 'export'));

// Launch command: 'gulp'
gulp.task('default', gulp.parallel('css', 'scss', 'html', 'script', 'js', 'browser-sync', 'watch'));