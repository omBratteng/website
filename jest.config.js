module.exports = {
	roots: ['<rootDir>/'],
	preset: 'ts-jest',
	resetMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
	testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]', '<rootDir>/src/__tests__/.eslintrc.js'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	moduleDirectories: ['node_modules', 'src', 'test'],
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
	},
	setupFilesAfterEnv: ['./test/jest.setup.ts'],
}
