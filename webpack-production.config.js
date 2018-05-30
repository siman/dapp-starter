const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const stylesPath = path.resolve(__dirname, 'src/app/styles');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: __dirname,

    entry: [path.join(__dirname, '/src/app/app.js')],

    // Render source-map file for final build
    //devtool: 'source-map',

    output: {
        path: buildPath, // Path of output file
        filename: 'app.js' // Name of output file
    },

    plugins: [

        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // suppresses warnings, usually from module minification
                warnings: false
            }
        }),

        // Allows error warnings but does not stop compiling.
        new webpack.NoErrorsPlugin(),

        // Transfer Files
        new TransferWebpackPlugin([
            {from: 'www'},
            // {from: 'bin'}
        ], path.resolve(__dirname, 'src')),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new ExtractTextPlugin('[name].css')
    ],

    module: {
        rules: [
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                use: [{
                    loader: 'url-loader'
                }],
                // include: [/react-summernote/, stylesPath]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader?modules"],
                include: [/flexboxgrid/]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"],
                include: [stylesPath]
            },
            {
                test: /(\.scss)$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', "sass-loader"]}),
                include: [stylesPath]
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', "less-loader"]}),
                include: [stylesPath]
            },
            {
                test: /(\.js|\.jsx)$/,
                use: ['react-hot-loader', 'babel-loader'], // react-hot-loader is like browser sync and babel loads jsx and es6-7
                //plugins: ['react-html-attrs', 'transform-class-properties', 'transform-object-rest-spread'],
                exclude: [nodeModulesPath]
            }
        ]
    }
};

module.exports = config;
