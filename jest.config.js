const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
    },
    testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e-spec.ts'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
