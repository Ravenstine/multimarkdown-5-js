MultiMarkdown-5.js
==================
Render [MultiMarkdown](https://github.com/fletcher/MultiMarkdown-5) to HTML with JavaScript in both Node.js and the Browser!  Powered by Emscripten.

## Prerequisites

- You do have Git and NPM installed, right?
- [Emscripten SDK](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

## Installation

`npm install --save multimarkdown-5`

If your prerequisites are installed and initialized correctly, the source of MultiMarkdown v5 should be pulled and compiled to JS with Emscripten and you should be ready to go.  In the case that something messes up, you can re-run the post-install process by running `gulp build` in `node-modules/multimarkdown-5`.

## Usage

```javascript
var MultiMarkdown = require('multimarkdown-5');

MultiMarkdown.render('## Hello World');

// '<h2 id="helloworld">Hello World</h2>'
```