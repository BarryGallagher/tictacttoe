
# Webpack
The initial setup is taken from **An intro to Webpack: what it is and how to use it**
https://www.freecodecamp.org/news/an-intro-to-webpack-what-it-is-and-how-to-use-it-8304ecdc3c60/

    - npm i react react-dom --save

React and ReactDOM

    npm i webpack webpack-dev-server webpack-cli --save--dev

wbepack = to bundle our app together
webpack-dev-server = allows for hot reloading

    --save--dev = these two modules above are dev dependencies

-npm i babel-core babel-loader @babel/preset-react     @babel/preset-env html-webpack-plugin --save-dev
React uses ES6 classes and import statements. Not all browsers supports (Internet Explorer). Babel will transpile our code to normal readable code for browsers.

Then we moved on to the webpack.config.js

    const path = require('path');

The path module provides utilities for working with file and directory paths
https://nodejs.org/api/path.html

    const HtmlWebpackPlugin = require('html-webpack-plugin');
The HTMLWebpackPlugin to generate an HTML file to be used for serving bundled JavaScript file/files
https://github.com/jantimon/html-webpack-plugin

    module.exports
A module is a discrete program, contained in a single file in Node.js. Modules are therefore tied to files, with one module per file. Modules are available in other programming languages.`module.exports` is an object that the current module returns when it is "required" in another program or module. In Node.js, the practice of making a module's code available for other modules to use is called "exporting" values.
https://stackabuse.com/how-to-use-module-exports-in-node-js/

    entry: './src/index.js',
There are multiple ways to define the `entry` property in your webpack configuration, this is an example of Single Entry (Shorthand) Syntax
https://webpack.js.org/concepts/entry-points/#single-entry-shorthand-syntax

      output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
      },
Configuring the `output` configuration options tells webpack how to write the compiled files to disk. Note that, while there can be multiple `entry` points, only one `output` configuration is specified.
https://webpack.js.org/concepts/output/

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      },
**Loaders** are transformations that are applied on the source code of a module. They allow you to pre-process files as you `import` or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or inline images as data URLs. Loaders even allow you to do things like `import` CSS files directly from your JavaScript modules!
[`module.rules`](https://webpack.js.org/configuration/module/#module-rules) allows you to specify several loaders within your webpack configuration. This is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.

Loaders are evaluated/executed from right to left (or from bottom to top)

      plugins: [new HtmlWebpackPlugin({
          template: './src/index.html'
        })]
**Plugins** are the [backbone](https://github.com/webpack/tapable) of webpack. webpack itself is built on the **same plugin system** that you use in your webpack configuration!
A webpack **plugin** is a JavaScript object that has an [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) method. This `apply` method is called by the webpack compiler, giving access to the **entire** compilation lifecycle
https://webpack.js.org/concepts/plugins/

### TODO
Read over the following
https://www.sitepoint.com/understanding-module-exports-exports-node-js/

# React
Now that we have setup git, npm, webpack and react, I'm going to follow # **Tutorial: Intro to React**
https://reactjs.org/tutorial/tutorial.html#what-are-we-building

Changes to **An intro to Webpack: what it is and how to use it** to get **Tutorial: Intro to React** to work
(1) Started by adding the following
 - src folder 
 - index.js
 - index.css

Ran `npm start`
Generated the following error
   

     npm ERR! missing script: start
Added package.json scripts.start
npm ERR! missing script: start

    "start": "webpack-dev-server --mode development --open --hot"

Loaded the browser displaying the following message
Html Webpack Plugin:

      Error: Child compilation failed:
      Entry module not found: Error: Can't resolve 'C:\DEV\_Personal\codeCoop\react\src\index.html' in 'C:\DEV\_Personal\codeCoop\react':
      Error: Can't resolve 'C:\DEV\_Personal\codeCoop\react\src\index.html' in 'C:\DEV\_Personal\codeCoop\react'

Added `index.html` to `./src` and ran  `npm start`
Launched the browser but the following error was issues by node

    ERROR in ./src/index.js
    Module build failed (from ./node_modules/babel-loader/lib/index.js):
    Error: Cannot find module '@babel/core'
     babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.

Checking the dependencies in package.json

    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.6",
Therefore, as the message states, we're using babel-loader 8 with core 6, going to upgrade to 7.5.4.
However, running npm install, the following error is logged

    npm ERR! code ETARGET
    npm ERR! notarget No matching version found for babel-core@^7.5.4
Had numerious problems with trying to load babel core, but I believe it boils down to the way I had it setup the dependencies in the package

    "devDependencies": {
        "@babel/core": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "@babel/preset-react": "^7.0.0",
        "babel-core": "^7.1.0",
        "babel-loader": "^8.0.6",
        ...
Basically, @babel/core is a scoped package ([https://docs.npmjs.com/about-scopes](https://docs.npmjs.com/about-scopes))  with the move to ^7. Therefore, my reference to the older ^6 babel core but asking for ^7 could not be satified. ([https://babeljs.io/docs/en/next/v7-migration#scoped-packages](https://babeljs.io/docs/en/next/v7-migration#scoped-packages))

The next error was as follows

    ERROR in ./src/index.css 1:5
    Module parse failed: Unexpected token (1:5)
    You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    > body {
    |     font: 14px "Century Gothic", Futura, sans-serif;
    |     margin: 20px;
     @ ./src/index.js 3:0-21
The error message is pretty clear, `currently no loaders configured to process this file` . The file is the CSS therefore, we need to specify a loader for webpack

 1. Run `npm install css-loader style-loader --save-dev`
 2. Update webpack.config.js with 

        {
		        test:/\.css$/,
			use:['style-loader','css-loader']
		}
    
   Final change to load the tic tack toe pre any react changes was to update index.html from

       <div  id="app"></div>

   to 
 

      <div  id="root"></div>
The reason for the change is that index.js has the following

    ReactDOM.render(
	    <Game  />,
	    document.getElementById('root')
    );
So, document.getElementById is plain native JS looking for the element with root. Of course, that doesn't exist but an element with app does. Either change the html or the lookup.
Now, when we run `npm run` the following screen is rendered




# Visual Code installations
https://babeljs.io/docs/en/editors/
