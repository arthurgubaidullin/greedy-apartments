import * as t from 'io-ts';
import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as _Eq from 'fp-ts/lib/Eq';

export type OfferAdded = t.TypeOf<typeof OfferAdded>;

export const OfferAdded = t.strict({
  document: OfferDocument.codec,
});

export const Eq: _Eq.Eq<OfferAdded> = _Eq.eqStrict;
