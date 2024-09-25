const config = require("../../qoq.config");

config.eslint[0].rules = {
    "consistent-return": 0,
}

config.knip = {
    ignoreDependencies: [
        '@saashub/qoq-eslint-v9-js',
        '@saashub/qoq-knip',
        'pkg-types'
    ]
}

module.exports = config;
