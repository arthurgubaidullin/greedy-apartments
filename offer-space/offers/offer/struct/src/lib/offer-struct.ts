import * as OfferId from '@ga/offer-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferStruct extends t.TypeOf<typeof codec> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferStructSimplified extends t.OutputOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

export const Eq: _Eq.Eq<OfferStruct> = _Eq.struct({
  id: OfferId.Eq,
  name: S.Eq,
});

export const toJSON = (struct: OfferStruct): OfferStructSimplified =>
  pipe(struct, codec.encode);
