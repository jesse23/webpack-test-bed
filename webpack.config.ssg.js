const path = require('path');
var StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

// https://github.com/webpack/webpack.js.org/blob/main/webpack.ssg.mjs
module.exports = {
  entry: './src/index_wp',
  // TODO: needed for server side running for now, can it be simplified to support esm so that
  // we could avoid duplicate build?
  target: 'node',
  mode: 'development',
  node: { global: true },
  output: {
    path: path.resolve(__dirname, 'dist_wp'),
    filename: './server/[name].bundle.js', // Main bundle
    // clean: true,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new StaticSiteGeneratorPlugin({
      // entry: "main",
      paths: [ '/'],
      // locals: ss,
    }),
  ],
};
