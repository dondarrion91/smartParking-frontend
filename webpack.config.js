const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


console.log(path.join(__dirname, "dist"));
module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        publicPath: "/",
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            API_URL: 'http://localhost:3000/api/v1/'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
