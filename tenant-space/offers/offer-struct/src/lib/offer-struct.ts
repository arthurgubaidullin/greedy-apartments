import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

const OfferStruct = t.strict({
  id: NonEmptyString,
  realtorId: NonEmptyString,
  name: t.string,
});

export type OfferStruct = t.TypeOf<typeof OfferStruct>;

export const Eq = _Eq.struct({
  id: S.Eq,
  realtorId: S.Eq,
  name: S.Eq,
});
