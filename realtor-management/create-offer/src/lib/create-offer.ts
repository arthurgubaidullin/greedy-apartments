import * as Offer from '@ga/offer-in-realtor-management';
import * as OfferDocument from '@ga/offer-document-in-realtor-management';

export const createOffer = (
  data: Offer.SimplifiedOffer
): OfferDocument.OfferDocument => {
  return Offer.create(data);
};
