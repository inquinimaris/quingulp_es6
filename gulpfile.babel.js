import gulp from 'gulp';
import run from 'gulp-run';
import gulpStuff from 'gulp';
const { task, src, dest, watch, parallel, series } = gulpStuff;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
const sass = gulpSass( dartSass );
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import { init, reload } from 'browser-sync';
import { sync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import pug from 'gulp-pug';
import nu from 'gulp-html';

// Writes sourcemaps and converts SCSS to CSS 
// into separate folder.
task('scss_to_css', function(){
  return src('dev/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dev'))
    .pipe(browserSync.reload({stream: true}))
});

// builds external plugins CSS libraries used.
// You have to manually add path to plugin's 
// CSS if there is any.
task('build_libs_css', function(){
  return src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(dest('dev/scss'))
    .pipe(browserSync.reload({stream: true}));
});

// builds external plugins JS libraries used.
// You have to manually add path to plugin's JS if there is any.
task('build_libs_js', function(){
  return src([
    'node_modules/lozad/dist/lozad.min.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    // 'node_modules/simple-parallax-js/dist/simpleParallax.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('dev/assets/js'))
    .pipe(browserSync.reload({stream: true}));
});
// watches for JS changes, reloads page if there was any.
task('watch_js', function(){
  return src('dev/js/*.js')
  .pipe(browserSync.reload({stream: true}));
});

// watches for HTML changes, reloads page if there was any.
task('watch_html', function(){
  return src(['dev/*.html'])
  .pipe(browserSync.reload({stream: true}));
});

// Builds HTML from Pug files.
task('pug_to_html', function(){
  return src(['dev/*.pug', '!dev/layout.pug'])
    .pipe(pug({
        pretty:true
      })
    )
    .pipe(dest('dev'));
});

// Watches your development folder.
task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "dev/"
    }
  });
});

// Uncomment this to use tunneling, comment previous task.
// task('browser-sync', function(){
//   browserSync.init({
//       server: {
//           baseDir: "dev/"
//       },
//       online: true,
//       tunnel: 'quin'
//   })
// });

task('validate_html', function(){
  return src('dev/*.html')
    .pipe(nu());
});

// Watcher function.
task('watch', function(){
  watch(['dev/*.pug', 'dev/components/*.pug', 'dev/blocks/**/*.pug'], parallel('pug_to_html'));
  watch('dev/scss/**/*.scss', parallel('scss_to_css'));
  // temporary disabled cause of some java issue on my end
  // watch('dev/*.html', parallel('watch_html', 'validate_html'));
  watch('dev/js/*.js', parallel('watch_js'));
});

// Deletes previous dist version to build 
// actual version without previous trash.
task('clean', async function(){
  del.sync('dist');
});

// Building tasks.
task('export', async function(){
  src('dev/**/*.html')
    .pipe(dest('dist'));

  src('dev/**/*.css')
    .pipe(dest('dist'));

  src('dev/assets/js/**/*.js')
    .pipe(dest('dist/assets/js'));
    
  src('dev/assets/fonts/**/*.*')
    .pipe(dest('dist/assets/fonts'));

  src('dev/assets/img/**/*.*')
    // .pipe(tinypng({
    //   key: 'KEY',
    //   sigFile: 'images/.tinypng-sigs',
    //   log: true
    // }))
    .pipe(dest('dist/assets/img'));   
});

// Defined series of tasks: cleans 'dist' folder and then builds your project.
// Launch command: 'guld build'
task('build', series('clean', 'export'));

// Launch command: 'gulp'
// task('default', parallel('build_libs_css', 'scss_to_css', 'watch_html', 'watch_js', 'build_libs_js', 'browser-sync', 'watch'));
task('default', parallel('build_libs_css', 'scss_to_css', 'watch_js', 'build_libs_js', 'browser-sync', 'watch'));