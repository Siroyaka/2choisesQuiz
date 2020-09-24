module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "preset": "ts-jest",
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  "testMatch": ["**/?(*.)+(test).+(ts|tsx|js)"],
};
