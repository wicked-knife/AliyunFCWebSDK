// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./page/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "page/index.html",
    }),
  ],
};

module.exports = config;