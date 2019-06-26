const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FolderCleaning = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin')
const babelConfig = require('./babel.config')
const ManifestPlugin = require('webpack-manifest-plugin');


const configPath = path.resolve('./config.js')
// TODO Write the documentation for this config.
const configObject = fs.existsSync(configPath) ? require(configPath) : {}

const NODE_ENV = JSON.stringify(process.env.NODE_ENV)

console.log(NODE_ENV)

let config = {
    mode: process.env.NODE_ENV,
    watch: NODE_ENV === "development",
    entry: configObject.entries ? configObject.entries : {},
    output: {
        path: path.resolve(`./${configObject.outputDirectoryName ? configObject.outputDirectoryName : 'dist'}` ),
        filename: configObject.chunk ? '[name].[hash:8].js' : '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [
                    'source-map-loader',
                    {
                        loader: 'babel-loader',
                        options: babelConfig
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    NODE_ENV === "development" ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(`./${configObject.outputDirectoryName ? configObject.outputDirectoryName : 'dist'}` )
    },
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': configObject.env ? JSON.stringify(configObject.env) : JSON.stringify({})
        }),
        new MiniCssExtractPlugin({
            filename: NODE_ENV === "development" ? '[name].css' : '[name].[hash:8].css',
            chunkFilename: NODE_ENV === "development" ? '[name].css' : '[name].[hash:8].css',
        }),
        new FolderCleaning([configObject.outputDirectoryName ? configObject.outputDirectoryName : 'dist'], {
            root: path.resolve('./'),
            verbose: true,
            dry: false
        }),
    ]
}
if (NODE_ENV === "development") {
    config.plugins.push(
        new Uglify({
            sourceMap: true
        })
    )
} else {
    config.plugins.push(
        new ManifestPlugin()
    )
}

if(configObject.copyHtmlFiles && Array.isArray(configObject.copyHtmlFiles)) {
    configObject.copyHtmlFiles.forEach( copyObject => {
        if (!copyObject.filePath || !copyObject.fileName) {
            return
        }

        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: copyObject.fileName,
                template: path.resolve(copyObject.filePath)
            })
        )
    })
}

module.exports = config
