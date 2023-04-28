const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
 template: './src/index.html',
 filename: './index.html'
});

module.exports = {
  mode: 'development',
  module: {
    rules: [{
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /output\.css$/i,
        include: path.resolve(__dirname, 'src/styles'),
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
  ]},
  plugins: [htmlPlugin],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
};