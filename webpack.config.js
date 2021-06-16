const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


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
