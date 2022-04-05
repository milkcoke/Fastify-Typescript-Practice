const {pathsToModuleNameMapper} = require("ts-jest");
const {compilerOptions} = require('../tsconfig.json');

module.exports = {
    preset: "ts-jest",
    // https://github.com/facebook/jest/issues/3613
    // relative path of project root directory from this config js file
    rootDir: '..',
    testMatch: [
        "**/?(*)+(test).ts"
    ],

    testEnvironment: "node", // default: jsdom
    resetMocks: true,
    clearMocks: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        // rootDir is the root of the directory containing `jest config file` or the `package.json`
        prefix: '<rootDir>'
    })
}