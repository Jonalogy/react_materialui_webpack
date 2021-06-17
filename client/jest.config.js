// jest.config.js
/** @type {import('@jest/types').Config.InitialOptions} */

const CLIENT_DIR = '<rootDir>'

const config = {
    verbose: true,
    modulePaths: [`${CLIENT_DIR}/src`]
};

module.exports = config;
