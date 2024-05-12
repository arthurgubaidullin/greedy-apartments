import { getRealtorListApiInRealtorRegistry } from './get-realtor-list-api-in-realtor-registry';

describe('getRealtorListApiInRealtorRegistry', () => {
  it('should work', () => {
    expect(getRealtorListApiInRealtorRegistry()).toEqual(
      'get-realtor-list-api-in-realtor-registry'
    );
  });
});
