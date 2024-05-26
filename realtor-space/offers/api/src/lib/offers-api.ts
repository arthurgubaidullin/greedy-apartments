import { PublishOffer, createOfferApi } from './create-offer-api';
import { getOffetListApi } from './get-offet-list-api';

export const get = (publish: PublishOffer) => ({
  createOffer: createOfferApi(publish),
  getOfferList: getOffetListApi,
});
