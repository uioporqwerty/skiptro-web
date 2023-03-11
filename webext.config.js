const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.output.hashFunction = 'sha256';
        console.dir(config);
        return config;
    }
};
