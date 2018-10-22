var path = require('path');
var SRC_DIR = path.join(__dirname, 'build/client/src');
var DIST_DIR = path.join(__dirname, 'build/client/dist/');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    mode: 'production',
    module: {
        rules: [
            {
                test : /\.jsx?/,
                include : SRC_DIR,
                loader : 'babel-loader', 
                query: {
                    presets: ['react', 'es2015']
                }   
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
              sourceMap: true,
              uglifyOptions: {
                compress: {
                  inline: false
                }
              }
            })
        ]
      
    }
}

/*
optimization.minimize({
          mangle: true,
          compress: {
            warnings: false, // Suppress uglification warnings
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true
          },
          output: {
            comments: false,
          },
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        })
*/
// ,
//         new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
//         new webpack.NoErrorsPlugin(),
//         new CompressionPlugin({
//           asset: "[path].gz[query]",
//           algorithm: "gzip",
//           test: /\.js$|\.css$|\.html$/,
//           threshold: 10240,
//           minRatio: 0
//         })