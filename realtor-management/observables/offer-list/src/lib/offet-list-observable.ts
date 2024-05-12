import * as O from 'fp-ts/Option';
import { IObservableValue, observable } from 'mobx';
import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import { Eq } from 'fp-ts/Eq';

type T = O.Option<OfferStruct.OfferStruct>;

const _offerList = observable.box<T>(O.none, {
  equals: O.getEq(OfferStruct.Eq).equals,
} satisfies Eq<T>);

export const offerList: Pick<IObservableValue<T>, 'get'> = _offerList;
