const path = require('path');
const SRC_DIR = path.join(__dirname, 'build/client/src');
const DIST_DIR = path.join(__dirname, 'build/client/dist/');
const webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: 'development',
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
                exclude: /node_modules/,
                use: [{
                  loader : 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env', '@babel/preset-react'],
                      plugins: ['@babel/plugin-proposal-class-properties']    
                    }
                  }
                ]
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