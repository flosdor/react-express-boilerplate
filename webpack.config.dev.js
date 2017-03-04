import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG
process.noDeprecation = true;

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/client.js',
        'webpack-dev-server/client?http://0.0.0.0:' + process.env.DEVPORT,
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": 'http://127.0.0.1:' + process.env.PORT
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'www.css',
            allChunks: false
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        'react-hot-loader/babel',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                }
            },
            {
                test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[ext]',
                    limit: 10000
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap'),
                exclude: /node_modules/
            }
        ]
    }
};