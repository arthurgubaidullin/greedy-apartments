import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import {
  IObservableValue,
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';
import { getRealtorListApi } from '@ga/get-realtor-list-api-in-realtor-registry';
import { constVoid, pipe } from 'fp-ts/function';
import { realtorAdded } from '@ga/realtor-added-observable-in-realtor-registry';

type RealtorStructROArrayOption = O.Option<
  ReadonlyArray<RealtorStruct.RealtorStruct>
>;

const _realtorList = observable.box<RealtorStructROArrayOption>(O.none, {
  equals: O.getEq(RA.getEq(RealtorStruct.Eq)).equals,
} satisfies _Eq.Eq<RealtorStructROArrayOption>);

const update = action(() => {
  pipe(getRealtorListApi(), O.some, (list) => _realtorList.set(list));
});

const subscribe = () =>
  autorun(() => pipe(realtorAdded.get(), O.fold(constVoid, update)));

let unsubscribe = constVoid;

onBecomeObserved(_realtorList, () => {
  update();
  unsubscribe = subscribe();
});

onBecomeUnobserved(_realtorList, () => {
  _realtorList.set(O.none);
  unsubscribe();
  unsubscribe = constVoid;
});

export const realtorList: Pick<
  IObservableValue<RealtorStructROArrayOption>,
  'get'
> = _realtorList;
