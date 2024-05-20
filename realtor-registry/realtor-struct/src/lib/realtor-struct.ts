import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

const RealtorStruct = t.strict({
  id: NonEmptyString,
  name: t.string,
  serviceId: NonEmptyString,
});

export type RealtorStruct = t.TypeOf<typeof RealtorStruct>;

export const Eq: _Eq.Eq<RealtorStruct> = _Eq.struct({
  id: S.Eq,
  name: S.Eq,
  serviceId: S.Eq,
});
