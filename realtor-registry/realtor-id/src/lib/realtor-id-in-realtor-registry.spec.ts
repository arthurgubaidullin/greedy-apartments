import { realtorIdInRealtorRegistry } from './realtor-id-in-realtor-registry';

describe('realtorIdInRealtorRegistry', () => {
  it('should work', () => {
    expect(realtorIdInRealtorRegistry()).toEqual(
      'realtor-id-in-realtor-registry'
    );
  });
});
