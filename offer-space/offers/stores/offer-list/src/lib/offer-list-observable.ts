import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { constVoid, flow, pipe } from 'fp-ts/function';
import * as I from 'fp-ts/Identity';
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
  action((offerList: ReadonlyArray<OfferStruct.OfferStruct>): void =>
    pipe(offerList, O.fromPredicate(RA.isNonEmpty), (list) =>
      offerListStore.set(list)
    )
  );

const reset = (offerListStore: IObservableValue<T>) =>
  action(() => offerListStore.set(O.none));

export const get =
  (P: {
    getOfferList: (
      id: ServiceId.ServiceId
    ) => ReadonlyArray<OfferStruct.OfferStruct>;
    offerAdded: ReadonlyObservable<O.Option<OfferStruct.OfferStruct>>;
  }) =>
  (id: ServiceId.ServiceId): ReadonlyObservable<T> => {
    const offerListStore = createOfferList();

    const _update = () => pipe(P.getOfferList(id), update(offerListStore));

    let unsubscribe = constVoid;

    onBecomeObserved(offerListStore, () => {
      _update();

      unsubscribe = autorun(() =>
        pipe(
          P.offerAdded.get(),
          O.fold(constVoid, () => _update())
        )
      );
    });

    onBecomeUnobserved(
      offerListStore,
      flow(unsubscribe, I.chainFirst(reset(offerListStore)))
    );

    return offerListStore;
  };
