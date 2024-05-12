import { offerRepositoryInTenantManagement } from './offer-repository';

describe('offerRepositoryInTenantManagement', () => {
  it('should work', () => {
    expect(offerRepositoryInTenantManagement()).toEqual(
      'offer-repository-in-tenant-management'
    );
  });
});
