const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.resolve.alias['missing-asset-registry-path'] = require.resolve('./web-mock-asset.js');

    return config;
};
