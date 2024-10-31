/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^store/(.*)$": "<rootDir>/src/store/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};
