import * as RealtorStruct from '@ga/realtor-struct-in-tenant-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { IObservableValue, observable } from 'mobx';

const create = () =>
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
> => {
  const realtorList = create();

  return realtorList;
};