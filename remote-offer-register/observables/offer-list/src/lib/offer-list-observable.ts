import * as OfferStruct from '@ga/offer-struct-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as RA from 'fp-ts/ReadonlyArray';
import {
  IObservableValue,
  action,
  autorun,
  observable,
  onBecomeObserved,
} from 'mobx';
import { getOfferListApi } from '@ga/get-offer-list-api-in-remote-offer-register';
import { constVoid, pipe } from 'fp-ts/function';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

const createOfferList = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update = (id: ServiceId.ServiceId) => (_offerList: IObservableValue<T>) =>
  action((): void => {
    pipe(getOfferListApi(id), O.fromPredicate(RA.isNonEmpty), (list) =>
      _offerList.set(list)
    );
  });

export const getOfferList =
  (id: ServiceId.ServiceId) =>
  (
    offerAdded: Pick<IObservableValue<O.Option<OfferStruct.OfferStruct>>, 'get'>
  ): Pick<IObservableValue<T>, 'get'> => {
    const _offerList = createOfferList();

    const _update = update(id)(_offerList);

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
