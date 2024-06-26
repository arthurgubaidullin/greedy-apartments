import * as OfferDocument from '@ga/offer-document-in-realtor-space';
import * as Offer from '@ga/offer-in-realtor-space';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export type CreateOffer = OfferDocument.SimplifiedOfferDocument;

export const createOffer = (
  data: CreateOffer
): E.Either<string[], OfferDocument.OfferDocument> =>
  pipe(data, OfferDocument.parse, E.map(Offer.create), E.map(Offer.toJSON));
