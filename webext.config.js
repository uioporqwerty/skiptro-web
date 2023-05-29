const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                }
            ]
        };
        config.plugins = [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './manifest.json', to: './' },
                    { from: './content-script.css', to: './' },
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
            new LicenseWebpackPlugin({
                perChunkOutput: false,
                outputFilename: 'licenses.txt',
                licenseTextOverrides: {
                    '@growthbook/growthbook': 'This project uses the MIT license. The core GrowthBook app will always remain open and free, although we may add some commercial enterprise add-ons in the future.'
                }
            })
        ];
        console.dir(config);
        return config;
    }
};
