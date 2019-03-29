const HtmlWebPackPlugin = require("html-webpack-plugin");
const moduleList = ["@babel/polyfill", "react", "react-dom", "d3-array"];

module.exports = {
  devtool: "none",
  entry: {
    main: ["@babel/polyfill", "./src/index.js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!d3-array)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: new RegExp(
            `[\\/]node_modules[\\/](${moduleList.join("|")})[\\/]`
          ),
          chunks: "initial",
          name: "vendors",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
