/* eslint-disable */
export default {
  displayName: 'offer-added-observable-in-realtor-management',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/realtor-management/observables/offer-added',
};
