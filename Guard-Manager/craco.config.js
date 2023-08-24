const webpack = require('webpack');

module.exports = {
    webpack: {
      plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
      ]
    }
}