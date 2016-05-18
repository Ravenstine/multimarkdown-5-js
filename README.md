multimarkdown-js
==================
Render [MultiMarkdown](https://github.com/fletcher/MultiMarkdown-5) to HTML with JavaScript in both Node.js and the Browser!  Powered by Emscripten.

## Prerequisites

- You do have Git and NPM installed, right?
- Gulp - `npm install -g gulp`
- [Emscripten SDK](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

## Installation

`npm install --save ravenstine/multimarkdown-js`

If your prerequisites are installed and initialized correctly, the source of MultiMarkdown v5 should be pulled and compiled to JS with Emscripten and you should be ready to go.

## Usage

```javascript
var MultiMarkdown = require('multimarkdown-js');

MultiMarkdown.render('## Hello World');

// '<h2 id="helloworld">Hello World</h2>'
```
