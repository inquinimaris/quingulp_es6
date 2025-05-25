# Just a frontend task-runner, v5

# How it's different from main branch
Uses Rollup for modern libraries and utilizes ESM instead of CommonJS (though yeah, it still compiles down to CommonJS I think?). 
jQuery been ditched.

## Things used:
+ Pug/Jade and SCSS preprocessors for HTML and CSS respectively;
+ HTML validation;
+ CSS sourcemaps;
+ BrowserSync, for remote view;
+ Couple packages, for sliders, galleries/modals, and LQIP style lazyloading;
+ Custom form validation for name, phone number and privacy consent;

## RTFM:
### Preprocessors:
+ [Pug](https://pugjs.org/api/getting-started.html)
+ [SCSS](https://sass-lang.com/documentation/syntax/)
### JS packages in bundle:
+ [Lazysizes](https://afarkas.github.io/lazysizes/index.html)
+ [Fancybox](https://fancyapps.com/fancybox/)
+ [Splide](https://splidejs.com/)