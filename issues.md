## _Current:
**Runner issues:**
1. While running, Gulp doesn't [watch]...
1.1. ...changes made in [.pug] files at [./app/components]; --fixed
1.2. ...changes made in [.scss] files at [./app/scss]; --fixed
2. [Nu] takes a lot of time to check HTML as it grows. Like... A lot;
3. [TinyPNG] API key isn't protected;

**Pug issues:**
None described yet.

**SCSS issues:**
1. No general variables values set (ex.: font sizes, colors, etc.);

**JS issues:**
1. [ES6] isn't present.

**Other issues:**
None described yet.

## _Solved:
**Runner issues:**
1.1. ...changes made in [.pug] files at [./app/components]; 
==== It now keeps track of changes of those files.
1.2. ...changes made in [.scss] files at [./app/scss];
==== It now keeps track of changes of those files.