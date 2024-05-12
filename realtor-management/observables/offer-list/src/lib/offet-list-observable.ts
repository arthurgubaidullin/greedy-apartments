import { getOffetListApi } from '@ga/get-offet-list-api-in-realtor-management';
import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import * as RealtorId from '@ga/realtor-id';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { IObservableValue, observable, onBecomeObserved } from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

const currentRealtorId = observable.box<O.Option<RealtorId.T>>(O.none, {
  equals: O.getEq(RealtorId.Eq).equals,
} satisfies _Eq.Eq<O.Option<RealtorId.T>>);

const _offerList = observable.box<T>(O.none, {
  equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
} satisfies _Eq.Eq<T>);

const update = (): void => {
  pipe(
    currentRealtorId.get(),
    O.map((realtorId) => ({ realtorId })),
    O.map(getOffetListApi),
    O.chain(O.fromPredicate(RA.isNonEmpty)),
    (list) => _offerList.set(list)
  );
};

onBecomeObserved(_offerList, () => {
  update();
});

export const offerList: Pick<IObservableValue<T>, 'get'> = _offerList;
