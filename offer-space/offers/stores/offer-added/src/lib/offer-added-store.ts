import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { IObservableValue, action, observable } from 'mobx';
import { ReadonlyObservable } from '@ga/readonly-observable';

type T = O.Option<OfferStruct.OfferStruct>;

const _getOfferAdded = () =>
  observable.box<T>(O.none, {
    equals: O.getEq(OfferStruct.Eq).equals,
  } satisfies _Eq.Eq<T>);

export const publish = (store: IObservableValue<T>) =>
  action((data: OfferStruct.OfferStruct) => {
    store.set(O.some(data));
  });

export const get = (): ReadonlyObservable<T> & {
  publish: (data: OfferStruct.OfferStruct) => void;
} => {
  const store = _getOfferAdded();
  return {
    get: () => store.get(),
    publish: publish(store),
  };
};
