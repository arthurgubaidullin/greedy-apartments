import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { IObservableValue, action, computed, observable } from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

export const get = (): IObservableValue<T> =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

export const update = (offerListStore: IObservableValue<T>) =>
  action((offerList: ReadonlyArray<OfferStruct.OfferStruct>): void =>
    pipe(offerList, O.fromPredicate(RA.isNonEmpty), (list) =>
      offerListStore.set(list)
    )
  );

const monoid = O.getMonoid<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>(
  RNEA.getSemigroup()
);

export const merge = (list: ReadonlyArray<ReadonlyObservable<T>>) =>
  computed(() =>
    pipe(
      list,
      RA.map((list) => list.get()),
      RA.reduce<T, T>(O.none, (b, a) => monoid.concat(b, a))
    )
  );

export const reset = (offerListStore: IObservableValue<T>) =>
  action(() => offerListStore.set(O.none));
