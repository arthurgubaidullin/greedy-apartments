import * as O from 'fp-ts/Option';
import { IObservableValue, observable } from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-management';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as _Eq from 'fp-ts/Eq';

const realtorList = () =>
  observable.box<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >(O.none, {
    equals: O.getEq(RNEA.getEq(RealtorStruct.Eq)).equals,
  } satisfies _Eq.Eq<O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>>);

export const get = (): Pick<
  IObservableValue<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >,
  'get'
> => realtorList();
