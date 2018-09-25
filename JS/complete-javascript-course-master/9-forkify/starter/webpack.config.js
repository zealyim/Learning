const path = require('path'); //include a buildin node module called path
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { //export this config object for webpack to work on it
    //entry point; output; loader; plugins
    entry: ['@babel/polyfill','./src/js/index.js'], //the order is important
    output: { //where to save or bundle files
        path: path.resolve(__dirname, 'dist'), //have to be an absolute path
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist' //where server should find the files
    },
    plugins: [ //array of all plugins
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/, //regular expression with / in the begin and end
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};