import { getOfferListApi } from './get-offer-list-api';
import { publishOfferApi } from './publish-offer-api';

export const get = () =>
  ({
    publishOffer: publishOfferApi,
    getOfferListApi: getOfferListApi,
  } as const);
