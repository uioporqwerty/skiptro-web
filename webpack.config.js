const path = require('path');

module.exports = {
    entry: './app/content-script.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        hashFunction = 'xxhash64',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
