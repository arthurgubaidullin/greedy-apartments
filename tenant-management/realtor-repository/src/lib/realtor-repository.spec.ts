import { realtorRepositoryInTenantManagement } from './realtor-repository';

describe('realtorRepositoryInTenantManagement', () => {
  it('should work', () => {
    expect(realtorRepositoryInTenantManagement()).toEqual(
      'realtor-repository-in-tenant-management'
    );
  });
});
