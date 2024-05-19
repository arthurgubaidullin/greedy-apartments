import * as RealtorStruct from '@ga/realtor-struct-in-tenant-management';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { IObservableValue, autorun, observable } from 'mobx';

const create = () =>
  observable.box<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >(O.none, {
    equals: O.getEq(RNEA.getEq(RealtorStruct.Eq)).equals,
  } satisfies _Eq.Eq<O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>>);

export const get = (
  remoteRealtorList: Pick<
    IObservableValue<
      O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
    >,
    'get'
  >
): Pick<
  IObservableValue<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >,
  'get'
> => {
  const realtorList = create();

  autorun(() => pipe(remoteRealtorList.get(), (data) => realtorList.set(data)));

  return realtorList;
};
