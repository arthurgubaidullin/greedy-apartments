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
} from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

const createOfferList = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update =
  (
    getOfferList: (
      id: ServiceId.ServiceId
    ) => ReadonlyArray<OfferStruct.OfferStruct>
  ) =>
  (id: ServiceId.ServiceId) =>
  (_offerList: IObservableValue<T>) =>
    action((): void => {
      pipe(
        pipe(getOfferList(id), O.fromPredicate(RA.isNonEmpty), (list) =>
          _offerList.set(list)
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
    const _offerList = createOfferList();

    const _update = update(getOfferList)(id)(_offerList);

    onBecomeObserved(_offerList, () => {
      _update();
    });

    autorun(() =>
      pipe(
        offerAdded.get(),
        O.fold(constVoid, () => _update())
      )
    );

    return _offerList;
  };
