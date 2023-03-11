const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.output.hashFunction = 'sha256';
        config.output.filename = 'main.js';
        config.entry = './content-script.ts';
        config.resolve = {
            extensions: ['.js', '.json', '.mjs', '.jsx', '.ts']
        };
        config.module = {
            rules: [
                {
                    test: /\.tsx?/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        };

        console.dir(config);
        return config;
    }
};
