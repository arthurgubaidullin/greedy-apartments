import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { observable } from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';

type RealtorStructROArrayOption = O.Option<
  ReadonlyArray<RealtorStruct.RealtorStruct>
>;

export const realtorList = observable.box<RealtorStructROArrayOption>(O.none, {
  equals: O.getEq(RA.getEq(RealtorStruct.Eq)).equals,
} satisfies _Eq.Eq<RealtorStructROArrayOption>);
