# QuinGulp probable FAQ

## General questions you may think of

### What the fcku is this thing?
It's a task runner originally designed by [this great dude](https://www.youtube.com/c/%D0%9E%D1%820%D0%B4%D0%BE1), I modified it and borrowed some ideas from another guy to whom I wish to die in misery.

### What it does?
Good stuff to save your time and you from a development headaches, like:
+ Refreshes page on every change;
+ Uses Pug/Jade and SCSS preprocessors for HTML and CSS respectively for faster development;
+ Also validates your HTML (will validate CSS and JS one day);
+ Builds and minifies, if told to do so, HTML, CSS and JS;
+ Compresses your images, if told to do so and if you have a TinyPNG API key;
+ NPM!

### How do I use this stuff?
At this point I assume you're familiar with NPM and terminal.
1. Open _Powershell_ terminal and write `npm i`;
2. Wait patiently for it to download all the stuff;
3. You're magnificent! (c)
4. Commands list:
  `gulp` - to run this bad boy;
  `gulp build` - to create a build version without the development-only stuff;
  `gulp hackFBI` - automatically hack nearest FBI server (lol no, that's really it);
5. ?????
6. Profit!!!

### Okay but what about ES si-- 
Do I look like a nerd or something?
But really I'm + it's just not there yet, sorry for that.

## Structure

### Default files and folders
| Folder        | Files                                                                          |
| ------        | --------                                                                       |
| root          | gulpfile.js / package-lock.json / package.json / issues.md / manual.md         |
| -app          | *.pug files and *.html + style.css                                             |
| --assets      | index.pug                                                                      |
| ---css        | *.min.css?                                                                     |
| ---fonts      | _null_                                                                         |
| ---img        | _null_                                                                         |
| ---js         | jquery.min.js / libs.min.js / main.js                                          |
| --components  | header.pug / footer.pug                                                        |
| --scss        | _fonts.scss / _global.scss / _libs.scss / _vars.scss / style.scss              |
| -dist*        | _null_                                                                         |

* dist folder follows the same structure as app but w/o preprocessors' files and scss folder and starting to exist only after issuing `gulp build` command.

### Subjective recommendations to use it as it is
+ Keep *.pug pages in app folder;
+ I didn't test SCSS/CSS behavior if there's other .scss file other than style.scss. If you want to keep those styles separate use underscore prefix `_hiddenFile.scss` and then just `@import "hiddenFile"` in style.scss;
+ I also never really tested JS in this way;
+ Use TinyPNG minifier at build only. Save those requests. Never tested with SVG yet;
+ Have fun? Those are more like subjects for issues list...

## But wait, there's more...
### How about I tell you how to use plugins and stuff?

### [Pug](https://pugjs.org/api/getting-started.html) stuff
#### Yet to be written...

### SCSS stuff
#### Yet to be written...

### JS stuff
#### [Lozad](https://apoorv.pro/lozad.js/)
#### [Simple Parallax](https://github.com/geosigno/simpleParallax.js)
#### [Magnific Popup](https://dimsemenov.com/plugins/magnific-popup/documentation.html)
#### [Slick Slider](https://github.com/kenwheeler/slick/)

