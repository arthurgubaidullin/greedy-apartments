import { getOfferListApi } from '@ga/get-offer-list-api-in-tenant-space';
import * as OfferStruct from '@ga/offer-struct-in-tenant-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { isNonEmpty } from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import {
  IObservableValue,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

const create = () =>
  observable.box<O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>>(
    O.none,
    {
      equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
    } satisfies _Eq.Eq<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >
  );

export const get = (): IObservableValue<
  O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
> => {
  const listStore = create();

  onBecomeObserved(listStore, () =>
    pipe(getOfferListApi(), O.fromPredicate(isNonEmpty), (list) =>
      listStore.set(list)
    )
  );

  onBecomeUnobserved(listStore, () => listStore.set(O.none));

  return listStore;
};
