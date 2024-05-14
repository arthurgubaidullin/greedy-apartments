import * as OfferStruct from '@ga/offer-struct-in-remote-offer-register';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { IObservableValue, observable } from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>;

const _offerList = observable.box<T>(O.none, {
  equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
} satisfies _Eq.Eq<T>);

export const offerList: Pick<IObservableValue<T>, 'get'> = _offerList;
