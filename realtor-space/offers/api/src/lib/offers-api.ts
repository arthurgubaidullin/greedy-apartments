import * as OfferAdded from '@ga/offer-added-observable-in-realtor-space';
import * as OfferList from '@ga/offer-list-store-in-realtor-space';
import { createOfferApi } from './create-offer-api';
import { getOfferListApi } from './get-offer-list-api';

export const get = () => {
  const offerAdded = OfferAdded.get();

  return {
    createOffer: createOfferApi(offerAdded.publish),
    getOfferList: getOfferListApi,
    offerList: OfferList.get(getOfferListApi)(offerAdded),
  } as const;
};
