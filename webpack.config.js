const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        polyfill: '@babel/polyfill',
        main: path.resolve(__dirname, 'src/scripts', 'main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].[contenthash].js',
        publicPath: '',
    },
    target: isDev ? 'web' : 'browserslist',
    devtool: 'source-map',
    devServer: {
        port: 9000,
        hot: true,
        open: 'firefox',
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
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isDev
                        ? 'style-loader'
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../',
                            },
                        },
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[contenthash].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                    name: '[name].[contenthash].[ext]',
                },
            },
            {
                test: /\.(svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[contenthash].[ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            favicon: 'src/image/magicss.ico',
            filename: 'index.html',
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
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
