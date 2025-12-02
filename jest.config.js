module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleDirectories: ["src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};
