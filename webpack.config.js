const path = require('path');
const entryPath = 'development';
const entryFile = 'app.js';

module.exports = {
  entry: `./${entryPath}/js/${entryFile}`,
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `${entryPath}/js`)
  },
  devServer: {
    contentBase: path.join(__dirname, entryPath),
    publicPath: '/js/',
    compress: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};