import * as OfferList from '@ga/offer-list-in-tenant-management';
import { updateRealtor } from '@ga/update-realtor-api-in-tenant-management';

export const get = () => {
  return {
    offerList: OfferList.get(),
    updateRealtor: updateRealtor,
  } as const;
};
