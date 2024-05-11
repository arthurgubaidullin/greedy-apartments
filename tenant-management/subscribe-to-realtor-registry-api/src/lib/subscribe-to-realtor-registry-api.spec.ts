import { subscribeToRealtorRegistryApiInTenantManagement } from './subscribe-to-realtor-registry-api';

describe('subscribeToRealtorRegistryApiInTenantManagement', () => {
  it('should work', () => {
    expect(subscribeToRealtorRegistryApiInTenantManagement()).toEqual(
      'subscribe-to-realtor-registry-api-in-tenant-management'
    );
  });
});
