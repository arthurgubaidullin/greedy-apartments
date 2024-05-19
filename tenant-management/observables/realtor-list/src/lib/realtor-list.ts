import * as O from 'fp-ts/Option';
import { IObservableValue, observable } from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-management';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as _Eq from 'fp-ts/Eq';

export const _realtorList = () =>
  observable.box<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >(O.none, {
    equals: O.getEq(RNEA.getEq(RealtorStruct.Eq)).equals,
  } satisfies _Eq.Eq<O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>>);

export const realtorList = (): Pick<
  IObservableValue<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >,
  'get'
> => _realtorList();
