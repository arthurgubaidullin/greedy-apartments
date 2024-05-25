import * as OfferStruct from '@ga/offet-struct-in-realtor-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { IObservableValue, action, observable } from 'mobx';

type OfferStructOption = O.Option<OfferStruct.OfferStruct>;

const _getOfferAdded = () =>
  observable.box<OfferStructOption>(O.none, {
    equals: O.getEq(OfferStruct.Eq).equals,
  } satisfies _Eq.Eq<OfferStructOption>);

const publish = (store: IObservableValue<OfferStructOption>) =>
  action((data: OfferStruct.OfferStruct) => {
    store.set(O.some(data));
  });

export const get = (): Pick<IObservableValue<OfferStructOption>, 'get'> & {
  publish: (data: OfferStruct.OfferStruct) => void;
} => {
  const store = _getOfferAdded();
  return {
    get: () => store.get(),
    publish: publish(store),
  };
};
