import { getRealtorApiInRealtorRegistry } from './get-realtor-api-in-realtor-registry';

describe('getRealtorApiInRealtorRegistry', () => {
  it('should work', () => {
    expect(getRealtorApiInRealtorRegistry()).toEqual(
      'get-realtor-api-in-realtor-registry'
    );
  });
});
