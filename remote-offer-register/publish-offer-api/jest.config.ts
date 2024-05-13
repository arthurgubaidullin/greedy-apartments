/* eslint-disable */
export default {
  displayName: 'publish-offer-api-in-remote-offer-register',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/remote-offer-register/publish-offer-api',
};
