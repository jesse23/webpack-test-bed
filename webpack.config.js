const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

module.exports = {
  entry: './src/index_wp',
  output: {
    path: path.resolve(__dirname, 'dist_wp'),
    filename: '.bundle.js', // Main bundle
    clean: true,
    libraryTarget: 'umd',
    /*
   path: "build",
    filename: "bundle.js",
    libraryTarget: "umd",
    */
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
  /*
  optimization: {
    splitChunks: {
      chunks: 'all', // This will apply to both initial and dynamically loaded chunks
      minSize: 20000, // Minimum size, in bytes, to create a separate chunk
      // maxSize: 0, // Maximum size, in bytes, for a chunk (0 means no limit)
      minChunks: 1, // Minimum number of chunks that must share a module before splitting
      maxAsyncRequests: 30, // Maximum number of concurrent requests at a time
      maxInitialRequests: 30, // Maximum number of parallel requests for an initial chunk
      automaticNameDelimiter: '~', // Delimiter used for naming chunks
      name: (module, chunks, cacheGroupKey) => {
      const chunkNames = chunks.map((chunk) => chunk.name).join('~');
      return `${cacheGroupKey}~${chunkNames}`; // Create a unique name
      },
      cacheGroups: {
        default: {
          minChunks: 1, // Minimum chunks to split
          priority: -20, // Group priority
          reuseExistingChunk: true, // Reuse existing chunk
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, // Include vendor modules
          priority: -10, // Higher priority for vendor chunks
        },
      },
    },
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
  */
};
