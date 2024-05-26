import { getRealtorListApi } from '@ga/get-realtor-list-api-in-tenant-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { constVoid, pipe } from 'fp-ts/function';
import {
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

const create = () =>
  observable.box<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >(O.none, {
    equals: O.getEq(RNEA.getEq(RealtorStruct.Eq)).equals,
  } satisfies _Eq.Eq<O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>>);

export const get = (
  realtorAdded: ReadonlyObservable<O.Option<RealtorStruct.RealtorStruct>>
): ReadonlyObservable<
  O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
> => {
  const realtorList = create();

  const update = action(() =>
    pipe(getRealtorListApi(), O.fromPredicate(RA.isNonEmpty), (value) =>
      realtorList.set(value)
    )
  );

  let unsubscribe = constVoid;

  onBecomeObserved(realtorList, () => {
    update();

    unsubscribe = autorun(() => {
      realtorAdded.get();

      update();
    });
  });

  onBecomeUnobserved(realtorList, () => {
    realtorList.set(O.none);

    unsubscribe();
    unsubscribe = constVoid;
  });

  return realtorList;
};
