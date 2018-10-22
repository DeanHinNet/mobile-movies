var path = require('path');
var SRC_DIR = path.join(__dirname, 'build/client/src');
var DIST_DIR = path.join(__dirname, 'build/client/dist/');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            {
                test : /\.jsx?/,
                include : SRC_DIR,
                loader : 'babel-loader', 
                query: {
                    presets: ['react', 'es2015']
                }   
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['build/client/dist/assets']
                    }
                }]
            }
        ]
    }
}

// {
//     test: /\.scss$/,
//     use: [{
//         loader: 'style-loader'
//     }, {
//         loader: 'css-loader'
//     }, {
//         loader: 'sass-loader',
//         options: {
//             includePaths: ['/client-react/dist/assets']
//         }
//     }]
// }