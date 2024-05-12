import * as Offer from '@ga/offer-in-realtor-management';
import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import { pipe } from 'fp-ts/function';

export type CreateOffer = Offer.SimplifiedOffer;

export const createOffer = (data: CreateOffer): OfferDocument.OfferDocument => {
  return pipe(Offer.create(data), Offer.toJSON);
};
