import * as RealtorId from '@ga/realtor-id';
import * as _Eq from 'fp-ts/Eq';
import * as t from 'io-ts';

const RealtorStruct = t.strict({
  id: RealtorId.codec,
  name: t.string,
});

export type RealtorStruct = t.TypeOf<typeof RealtorStruct>;

export const Eq: _Eq.Eq<RealtorStruct> = _Eq.struct({
  id: _Eq.eqStrict,
  name: _Eq.eqStrict,
});
