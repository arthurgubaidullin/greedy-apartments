import * as _Eq from 'fp-ts/Eq';
import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorStruct extends t.TypeOf<typeof codec> {}

export const codec = t.strict({
  id: NonEmptyString,
  name: t.string,
});

export const Eq = _Eq.struct<RealtorStruct>({
  id: _Eq.eqStrict,
  name: _Eq.eqStrict,
});
