import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import {
  IObservableValue,
  action,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';
import { getRealtorListApi } from '@ga/get-realtor-list-api-in-realtor-registry';
import { pipe } from 'fp-ts/function';

type RealtorStructROArrayOption = O.Option<
  ReadonlyArray<RealtorStruct.RealtorStruct>
>;

const _realtorList = observable.box<RealtorStructROArrayOption>(O.none, {
  equals: O.getEq(RA.getEq(RealtorStruct.Eq)).equals,
} satisfies _Eq.Eq<RealtorStructROArrayOption>);

const update = action(
  (list: O.Option<ReadonlyArray<RealtorStruct.RealtorStruct>>) => {
    _realtorList.set(list);
  }
);

onBecomeObserved(_realtorList, () => {
  pipe(getRealtorListApi(), O.some, update);
});

onBecomeUnobserved(_realtorList, () => {
  update(O.none);
});

export const realtorList: Pick<
  IObservableValue<RealtorStructROArrayOption>,
  'get'
> = _realtorList;
