const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/scripts', 'development.js'),
        AnimationAssistant: [
            '@babel/polyfill',
            path.resolve(__dirname, 'src/scripts', 'AnimationAssistant.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].js',
        publicPath: '',
    },
    target: isDev ? 'web' : 'browserslist',
    devtool: 'source-map',
    devServer: {
        port: 9000,
        hot: true,
        open: 'firefox',
        contentBase: path.resolve(__dirname, 'src'),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'ru-index.html'),
            filename: 'ru-index.html',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'en-index.html'),
            filename: 'en-index.html',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
};
