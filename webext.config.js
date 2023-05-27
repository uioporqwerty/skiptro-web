const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const webpack = require('webpack');
const path = require('path');

module.exports = {
    webpack: (config) => {
        config.output.hashFunction = 'sha256';
        config.output.filename = '[name].js';
        config.entry = {
            'background-script': './background-script.ts',
            'content-script': './content-script.ts',
            popup: './popup.tsx'
        };
        config.resolve = {
            extensions: ['.js', '.json', '.ts', '.tsx']
        };
        config.module = {
            rules: [
                {
                    test: /\.tsx?/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        };
        config.plugins = [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './manifest.json', to: './' },
                    { from: './_locales', to: './_locales' },
                    { from: './images', to: './images' },
                    { from: './fonts', to: './fonts' },
                    { from: '../node_modules/webextension-polyfill/dist/browser-polyfill.js', to: './' }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'app', 'index.html'),
                filename: 'index.html',
                inject: true
            }),
            new MiniCssExtractPlugin({
                filename: 'content-script.css'
            }),
            new LicenseWebpackPlugin({
                perChunkOutput: false,
                outputFilename: 'licenses.txt'
            })
        ];
        console.dir(config);
        return config;
    }
};
