import { realtorRepositoryInRegistry } from './realtor-repository-in-registry';

describe('realtorRepositoryInRegistry', () => {
  it('should work', () => {
    expect(realtorRepositoryInRegistry()).toEqual(
      'realtor-repository-in-registry'
    );
  });
});
