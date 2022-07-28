const {pathsToModuleNameMapper} = require("ts-jest");
const {compilerOptions} = require('../tsconfig.json');

module.exports = {
    testEnvironment: "node", // default: jsdom
    preset: "ts-jest",
    // https://github.com/facebook/jest/issues/3613
    // relative path of project root directory from this config js file
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    },

    rootDir: '..',
    testMatch: [
        "**/?(*)+(test).ts"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: [
        'ts', 'js', 'json'
    ],
    resetMocks: true,
    clearMocks: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        // rootDir is the root of the directory containing `jest config file` or the `package.json`
        prefix: '<rootDir>'
    })
}