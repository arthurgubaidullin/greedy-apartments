import * as OfferList from '@ga/offer-list-in-tenant-management';
import * as RealtorList from '@ga/realtor-list-in-tenant-management';
import * as RealtorRegistry from '@ga/service-in-realtor-registry';

export const get = () => {
  const registry = RealtorRegistry.get();

  return {
    realtorList: RealtorList.get(registry.realtorList),
    offerList: OfferList.get(),
  } as const;
};
