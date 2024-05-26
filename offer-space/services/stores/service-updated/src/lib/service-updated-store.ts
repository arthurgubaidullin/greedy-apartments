import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { IObservableValue, observable } from 'mobx';

type ServiceIdOption = O.Option<ServiceId.ServiceId>;

export const create = (): IObservableValue<ServiceIdOption> =>
  observable.box<ServiceIdOption>(O.none, {
    equals: O.getEq(ServiceId.Eq).equals,
  } satisfies _Eq.Eq<ServiceIdOption>);
