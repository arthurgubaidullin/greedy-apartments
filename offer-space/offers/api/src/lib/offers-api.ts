import { getOfferListApi } from './get-offer-list';
import { publishOfferApi } from './publish-offer';

export const get = () =>
  ({
    publishOffer: publishOfferApi,
    getOfferList: getOfferListApi,
  } as const);
