import { getOffetListApi } from '@ga/get-offet-list-api-in-realtor-space';
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

const getOfferList = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update = (_offerList: IObservableValue<T>) =>
  action((): void =>
    pipe(getOffetListApi(), O.fromPredicate(RA.isNonEmpty), (list) =>
      _offerList.set(list)
    )
  );

export const get = (
  offerAdded: Pick<IObservableValue<O.Option<OfferStruct.OfferStruct>>, 'get'>
): Pick<IObservableValue<T>, 'get'> => {
  const offerList = getOfferList();

  const _update = update(offerList);

  onBecomeObserved(offerList, () => {
    _update();
  });

  autorun(() => pipe(offerAdded.get(), O.fold(constVoid, _update)));

  return offerList;
};
