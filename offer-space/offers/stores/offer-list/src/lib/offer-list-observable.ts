import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { constVoid, pipe } from 'fp-ts/function';
import {
  IObservableValue,
  action,
  autorun,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

export const createOfferList = (): IObservableValue<T> =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update = (offerListStore: IObservableValue<T>) =>
  action((offerList: ReadonlyArray<OfferStruct.OfferStruct>): void => {
    pipe(
      pipe(offerList, O.fromPredicate(RA.isNonEmpty), (list) =>
        offerListStore.set(list)
      )
    );
  });

export const get =
  (
    getOfferList: (
      id: ServiceId.ServiceId
    ) => ReadonlyArray<OfferStruct.OfferStruct>
  ) =>
  (id: ServiceId.ServiceId) =>
  (
    offerAdded: ReadonlyObservable<O.Option<OfferStruct.OfferStruct>>
  ): ReadonlyObservable<T> => {
    const offerListStore = createOfferList();

    const _update = () => pipe(getOfferList(id), update(offerListStore));

    let unsubscribe = constVoid;

    onBecomeObserved(offerListStore, () => {
      _update();

      unsubscribe = autorun(() =>
        pipe(
          offerAdded.get(),
          O.fold(constVoid, () => _update())
        )
      );
    });

    onBecomeUnobserved(offerListStore, unsubscribe);

    return offerListStore;
  };
