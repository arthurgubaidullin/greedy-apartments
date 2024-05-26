import * as ServiceId from '@ga/service-id-in-offer-space';
import * as ServiceUpdatedStore from '@ga/service-updated-store-in-offer-space';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';

interface ChangeService {
  readonly change: (value: O.Option<ServiceId.ServiceId>) => void;
}

const changeServiceApi =
  (currentService: ChangeService) =>
  (serviceId: NonEmptyString): void =>
    pipe(
      ServiceId.fromNonEmptyString(serviceId),
      O.some,
      currentService.change
    );

export const get = () => {
  const serviceUpdated = ServiceUpdatedStore.get();

  return {
    changeService: changeServiceApi,
    serviceUpdated: serviceUpdated,
  };
};
