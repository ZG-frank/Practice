const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MY_PATH = require("./consts");

module.exports = { 
    mode: "development",
    entry: MY_PATH.APP_PATH,
    output: { 
        path: MY_PATH.BUILD_PATH,
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /(\.less|\.css)$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(MY_PATH.WEB_PUBLIC, `./index.html`)
        })
    ],
    devtool: 'cheap-module-source-map',
    target: 'web'
}