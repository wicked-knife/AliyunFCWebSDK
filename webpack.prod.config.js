// Generated using webpack-cli https://github.com/webpack/webpack-cli
const config = {
  entry: "./src/index.ts",
  mode: "production",
  plugins: [

  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  experiments: {
    outputModule: true,
  },

};

module.exports = config;