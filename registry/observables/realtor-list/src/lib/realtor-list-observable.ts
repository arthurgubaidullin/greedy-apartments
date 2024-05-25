import { getRealtorListApi } from '@ga/get-realtor-list-api-in-registry';
import { realtorAdded } from '@ga/realtor-added-observable-in-registry';
import * as RealtorStruct from '@ga/realtor-struct-in-registry';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { constVoid, pipe } from 'fp-ts/function';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import {
  IObservableValue,
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

type RealtorStructROArrayOption = O.Option<
  RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>
>;

const _realtorList = observable.box<RealtorStructROArrayOption>(O.none, {
  equals: O.getEq(RNEA.getEq(RealtorStruct.Eq)).equals,
} satisfies _Eq.Eq<RealtorStructROArrayOption>);

const update = action((): void =>
  pipe(getRealtorListApi(), O.fromPredicate(RA.isNonEmpty), (list) =>
    _realtorList.set(list)
  )
);

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
