const { merge } = require("webpack-merge");
const path = require("path");

const commonConfig = {
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts", // Or 'ts' if you don't need tsx
          target: "es2015",
        },
      },
    ],
  },
};

const developmentConfig = require("./webpack.dev.config");

const productionConfig = require("./webpack.prod.config");

module.exports = (env, args) => {
  const outputConfigMap = {
    esm: {
      output: {
        filename: "index.js",
        path: path.resolve(__dirname, "lib"),
        module: true,
        library: {
          type: "module",
        },
      },
    },
    window: {
      output: {
        filename: "index.window.js",
        path: path.resolve(__dirname, "lib"),
        library: {
          name: "AliyunFC",
          type: "window",
        },
      },
    },
  };
  const outputConfig = outputConfigMap[env.type];

  if (!outputConfig && args.mode === "production") {
    throw new Error("webpack config output.type is required.");
  }

  switch (args.mode) {
    case "development":
      return merge(commonConfig, developmentConfig);
    case "production":
      return merge(commonConfig, productionConfig, outputConfig);
    default:
      throw new Error("No matching configuration was found!");
  }
};
