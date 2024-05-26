import * as _CurrentServiceIdObservable from '@ga/current-service-id-observable-in-realtor-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import { NonEmptyString } from 'io-ts-types';

interface CurrentServiceIdObservable {
  readonly currentServiceId: ReadonlyObservable<O.Option<NonEmptyString>>;
}

interface ConnectToService {
  readonly connectToService: (serviceId: NonEmptyString) => void;
}

export const get = (): CurrentServiceIdObservable & ConnectToService => {
  const currentServiceIdStore = _CurrentServiceIdObservable.get();

  return {
    currentServiceId: currentServiceIdStore,
    connectToService: _CurrentServiceIdObservable.connect(
      currentServiceIdStore
    ),
  };
};
