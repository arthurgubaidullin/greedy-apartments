import { getRealtorListApi } from '@ga/get-realtor-list-api-in-tenant-space';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import {
  IObservableValue,
  action,
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

export const get = (): Pick<
  IObservableValue<
    O.Option<RNEA.ReadonlyNonEmptyArray<RealtorStruct.RealtorStruct>>
  >,
  'get'
> => {
  const realtorList = create();

  const update = action(() => {
    return pipe(getRealtorListApi(), O.fromPredicate(RA.isNonEmpty), (value) =>
      realtorList.set(value)
    );
  });

  onBecomeObserved(realtorList, () => {
    update();
  });

  onBecomeUnobserved(realtorList, () => {
    realtorList.set(O.none);
  });

  return realtorList;
};
