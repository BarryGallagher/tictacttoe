const path = require('path');
// The HTMLWebpackPlugin to generate an HTML file to be used for serving bundled JavaScript file/files
// https://github.com/jantimon/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //This property defines where the application starts
  entry: './src/index.js',
  //This property defines the file path and the file name which will be used for deploying the bundled file
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  //Setup loaders. This is to specify what webpack should do for a specific type for file. Webpack out of box only understands JavaScript and JSON, but if your project has any other language used, this would be the place to specify what to do with that new language.
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
}
