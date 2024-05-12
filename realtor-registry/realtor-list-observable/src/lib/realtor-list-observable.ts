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

export const realtorList: IObservableValue<RealtorStructROArrayOption> =
  observable.box<RealtorStructROArrayOption>(O.none, {
    equals: O.getEq(RA.getEq(RealtorStruct.Eq)).equals,
  } satisfies _Eq.Eq<RealtorStructROArrayOption>);

const update = action(
  (list: O.Option<ReadonlyArray<RealtorStruct.RealtorStruct>>) => {
    realtorList.set(list);
  }
);

onBecomeObserved(realtorList, () => {
  pipe(getRealtorListApi(), O.some, update);
});

onBecomeUnobserved(realtorList, () => {
  update(O.none);
});
