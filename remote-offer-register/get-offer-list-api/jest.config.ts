/* eslint-disable */
export default {
  displayName: 'get-offer-list-api-in-remote-offer-register',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/remote-offer-register/get-offer-list-api',
};
