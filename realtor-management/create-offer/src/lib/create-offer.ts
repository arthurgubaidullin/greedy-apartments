import * as Offer from '@ga/offer-in-realtor-management';
import * as OfferDocument from '@ga/offer-document-in-realtor-management';

export type CreateOffer = Offer.SimplifiedOffer;

export const createOffer = (data: CreateOffer): OfferDocument.OfferDocument => {
  return Offer.create(data);
};
