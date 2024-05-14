import * as OfferId from '@ga/offer-id-in-remote-offer-register';
import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

export const Eq: _Eq.Eq<OfferDocument> = _Eq.struct({
  id: OfferId.Eq,
  name: S.Eq,
});
