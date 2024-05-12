import * as O from 'fp-ts/Option';
import { IObservableValue, action, observable } from 'mobx';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';
import { Eq } from 'fp-ts/lib/Eq';

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
