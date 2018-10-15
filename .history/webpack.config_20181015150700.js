const path = require('path');
const { resolve } = require('path');
const webpack =  require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const dirNode = 'node_modules';
const dirApp = resolve(path.join (__dirname));


// if (module.hot) {
//   require ('preact/debug');
// }

module.exports = {
    mode: 'development',
    entry: path.join (dirApp, 'index.ts'),
    output: {
        path: path.resolve (__dirname, 'dist'),
        filename: 'dist.js',
    },
    devServer: {
        hot: false,
        contentBase: path.join (__dirname, 'dist'),
        compress: true,
        port: 4000,
    },
    resolve: {
        modules: [dirNode, dirApp],
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
        }
    },
    plugins: [
        new webpack.DefinePlugin ({
            'process.env': {
                NODE_ENV: JSON.stringify (process.env.NODE_ENV || 'development'),
            },
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: 'Boilerplate Preact'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader',
                },
            }
        ],
    },
};
