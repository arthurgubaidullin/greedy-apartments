import { getOfferListApi } from '@ga/get-offer-list-api-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as I from 'fp-ts/Identity';
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

interface GetCurrentService {
  readonly get: () => O.Option<ServiceId.ServiceId>;
}

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

const createOfferList = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
  } satisfies _Eq.Eq<T>);

const update =
  (currentService: GetCurrentService) => (_offerList: IObservableValue<T>) =>
    action((): void => {
      pipe(
        currentService.get(),
        O.map((id) =>
          pipe(getOfferListApi(id), O.fromPredicate(RA.isNonEmpty), (list) =>
            _offerList.set(list)
          )
        )
      );
    });

export const getOfferList =
  (currentService: GetCurrentService) =>
  (
    offerAdded: Pick<IObservableValue<O.Option<OfferStruct.OfferStruct>>, 'get'>
  ): Pick<IObservableValue<T>, 'get'> => {
    const _offerList = createOfferList();

    const _update = update(currentService)(_offerList);

    onBecomeObserved(_offerList, () => {
      _update();
    });

    autorun(() =>
      pipe(
        currentService.get(),
        I.map(() => offerAdded.get()),
        O.fold(constVoid, () => _update())
      )
    );

    return _offerList;
  };
