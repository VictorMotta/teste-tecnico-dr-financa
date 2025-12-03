module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};
