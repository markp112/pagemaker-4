/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/tests/"],
	moduleDirectories: ["node_modules", "./"],
	modulePaths: ["<rootDir>"],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	moduleNameMapper: {
		"@api/(.*)": ["<rootDir>/src/api/$1"],
		"@database/(.*)": ["<rootDir>/src/database/$1"],
		"@errors/(.*)": ["<rootDir>/src/common/errors/$1"],
		"@common/(.*)": ["<rootDir>/src/common/$1"],
		"@logger/(.*)": ["<rootDir>/src/logger/$1"],
		"@firebase/(.*)": ["<rootDir>/src/firebase/$1*"],
	},
};
