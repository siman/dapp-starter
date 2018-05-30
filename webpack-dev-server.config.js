const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const stylesPath = path.resolve(__dirname, 'src/app/styles');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,

    // Entry points to the project
    entry: [
        //'webpack/hot/dev-server',
        //'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.js'),
    ],

    output: {
        path: buildPath, // Path of output file
        filename: 'app.js'
    },

    //devtool: 'inline-source-map',
    devtool: 'source-map',

    // Server Configuration options.
    // Docs: https://webpack.js.org/configuration/dev-server/
    devServer: {
        contentBase: path.join(__dirname, 'src/www'),

        //compress: true,

        // filename has no effect when used without lazy mode.
        //lazy: true,
        //filename: 'app.js',

        //hot: true, // Live-reload

        //devtool: 'eval',

        //quiet: true
        //inline: true,

        disableHostCheck: true,
        host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
        port: 8080
    },

    plugins: [
        //  // Enables Hot Modules Replacement
        //  new webpack.HotModuleReplacementPlugin(),
        //  // Allows error warnings but does not stop compiling.
        //  new webpack.NoErrorsPlugin(),
        //  // Moves files
        //  new TransferWebpackPlugin([
        //    {from: 'www'},
        //  ], path.resolve(__dirname, 'src')),
    ],

    module: {
        rules: [
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                use: [ 'url-loader' ],
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader?modules"],
                include: [/flexboxgrid/, /bootstrap-daterangepicker/, stylesPath]
            },
            {
                test: /(\.scss)$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', "sass-loader"] }),
                include: [stylesPath]
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', "less-loader"] }),
                include: [stylesPath]
            },
            {
                test: /(\.js|\.jsx)$/,
                use: ['react-hot-loader',
                    {
                      loader: 'babel-loader',
                      options: {
                        // presets: ['env'],
                        plugins: ['lodash', 'react-html-attrs', 'transform-class-properties', 'transform-object-rest-spread']
                      }
                    }
                ], // react-hot-loader is like browser sync and babel loads jsx and es6-7
                // plugins: ['react-html-attrs', 'transform-class-properties', 'transform-object-rest-spread'],
                exclude: [nodeModulesPath]
            }
        ]
    }
};
