import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { IObservableValue, action, observable } from 'mobx';

interface ChangeService {
  readonly change: (value: O.Option<ServiceId.ServiceId>) => void;
}

type ServiceIdOption = O.Option<ServiceId.ServiceId>;

const _create = (): IObservableValue<ServiceIdOption> =>
  observable.box<ServiceIdOption>(O.none, {
    equals: O.getEq(ServiceId.Eq).equals,
  } satisfies _Eq.Eq<ServiceIdOption>);

const change = (store: IObservableValue<ServiceIdOption>) =>
  action((value: ServiceIdOption) => {
    store.set(value);
  });

export const create = () => {
  const store = _create();

  return {
    get: () => store.get(),
    change: change(store),
  } as const satisfies Pick<IObservableValue<ServiceIdOption>, 'get'> &
    ChangeService;
};
