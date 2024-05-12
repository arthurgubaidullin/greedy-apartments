import * as Offer from '@ga/offer-in-realtor-management';
import * as t from 'io-ts';
import * as OfferId from '@ga/offer-id';
import { pipe } from 'fp-ts/function';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

export const codec = Offer.codec;

export const getId = (document: OfferDocument): OfferId.T =>
  pipe(document, codec.encode, (a) => a.id);
