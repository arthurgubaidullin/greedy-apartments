/* eslint-disable */
export default {
  displayName: 'get-realtor-list-api-in-tenant-space',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/tenant-space/realtors/get-realtor-list-api',
};
