/* eslint-disable */
export default {
  displayName: 'subscribe-to-realtor-registry-api-in-tenant-management',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../coverage/tenant-management/subscribe-to-realtor-registry-api',
};
