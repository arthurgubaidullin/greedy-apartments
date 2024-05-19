import { offerIdInTenantManagement } from './offer-id-in-tenant-management';

describe('offerIdInTenantManagement', () => {
  it('should work', () => {
    expect(offerIdInTenantManagement()).toEqual(
      'offer-id-in-tenant-management'
    );
  });
});
