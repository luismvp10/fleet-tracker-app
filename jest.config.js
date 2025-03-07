const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "^@/stores/(.*)$": "<rootDir>/stores/$1",
    },
    moduleDirectories: ["node_modules", "<rootDir>", ],
    collectCoverage: true,
    // collectCoverageFrom: [
    //     "components/**/*.{js,jsx,ts,tsx}",
    //     "app/**/*.{js,jsx,ts,tsx}",
    //     "!**/*.test.{js,jsx,ts,tsx}",
    //     "!**/_app.{js,jsx,ts,tsx}",
    //     "!**/_document.{js,jsx,ts,tsx}",
    // ],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
};

module.exports = createJestConfig(customJestConfig);

