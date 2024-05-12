/* eslint-disable */
export default {
  displayName: 'realtor-list-observable-in-realtor-registry',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/realtor-registry/realtor-list-observable',
};
