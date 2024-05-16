import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as Offer from '@ga/offer-in-realtor-management';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export type CreateOffer = OfferDocument.SimplifiedOfferDocument;

export const createOffer = (
  data: CreateOffer
): E.Either<string[], OfferDocument.OfferDocument> => {
  return pipe(
    data,
    OfferDocument.parse,
    E.map(Offer.create),
    E.map(Offer.toJSON)
  );
};
