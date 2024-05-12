import { realtorListObservableInRealtorRegistry } from './realtor-list-observable';

describe('realtorListObservableInRealtorRegistry', () => {
  it('should work', () => {
    expect(realtorListObservableInRealtorRegistry()).toEqual(
      'realtor-list-observable-in-realtor-registry'
    );
  });
});
