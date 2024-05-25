import * as RealtorStruct from '@ga/realtor-struct-in-registry';
import * as O from 'fp-ts/Option';
import { Eq } from 'fp-ts/Eq';
import { IObservableValue, action, observable } from 'mobx';

type RealtorStructOption = O.Option<RealtorStruct.RealtorStruct>;

const _realtorAdded = observable.box<RealtorStructOption>(O.none, {
  equals: O.getEq(RealtorStruct.Eq).equals,
} satisfies Eq<RealtorStructOption>);

export const publish = action((realtor: RealtorStruct.RealtorStruct) => {
  _realtorAdded.set(O.some(realtor));
});

export const realtorAdded: Pick<
  IObservableValue<RealtorStructOption>,
  'get'
> = _realtorAdded;
