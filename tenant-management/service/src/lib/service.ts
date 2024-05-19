import * as RealtorList from '@ga/realtor-list-in-tenant-management';
import * as OfferList from '@ga/offer-list-in-tenant-management';

export const get = () => {
  return {
    realtorList: RealtorList.get(),
    offerList: OfferList.get(),
  } as const;
};
