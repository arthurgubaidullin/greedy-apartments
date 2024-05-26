import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
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

const getOfferListStore = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update =
  (getOfferList: () => readonly OfferStruct.OfferStruct[]) =>
  (offerListStore: IObservableValue<T>) =>
    action((): void =>
      pipe(getOfferList(), O.fromPredicate(RA.isNonEmpty), (list) =>
        offerListStore.set(list)
      )
    );

export const get =
  (getOfferList: () => readonly OfferStruct.OfferStruct[]) =>
  (
    offerAdded: Pick<IObservableValue<O.Option<OfferStruct.OfferStruct>>, 'get'>
  ): Pick<IObservableValue<T>, 'get'> => {
    const offerList = getOfferListStore();

    const _update = update(getOfferList)(offerList);

    onBecomeObserved(offerList, () => {
      _update();
    });

    autorun(() => pipe(offerAdded.get(), O.fold(constVoid, _update)));

    return offerList;
  };
