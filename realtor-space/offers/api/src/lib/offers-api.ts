import * as OfferAdded from '@ga/offer-added-observable-in-realtor-space';
import * as OfferList from '@ga/offer-list-store-in-realtor-space';
import { createOfferApi } from './create-offer-api';
import { getOffetListApi } from './get-offet-list-api';

export const get = () => {
  const offerAdded = OfferAdded.get();

  return {
    createOffer: createOfferApi(offerAdded.publish),
    getOfferList: getOffetListApi,
    offerList: OfferList.get(getOffetListApi)(offerAdded),
  } as const;
};
