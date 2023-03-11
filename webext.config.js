const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.output.hashFunction = 'xxhash64';
        return config;
    }
};
