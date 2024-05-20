/* eslint-disable */
export default {
  displayName: 'subscribe-to-realtor-register-api-in-tenant-space',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/tenant-space/realtors/subscribe-to-realtor-register-api',
};
