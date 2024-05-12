import { createOfferApiInRealtorManagement } from './create-offer-api';

describe('createOfferApiInRealtorManagement', () => {
  it('should work', () => {
    expect(createOfferApiInRealtorManagement()).toEqual(
      'create-offer-api-in-realtor-management'
    );
  });
});
