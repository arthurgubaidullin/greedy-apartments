import * as ServiceId from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';

interface ChangeService {
  readonly change: (value: O.Option<ServiceId.ServiceId>) => void;
}

export const changeServiceApi =
  (currentService: ChangeService) =>
  (serviceId: NonEmptyString): void =>
    pipe(
      ServiceId.fromNonEmptyString(serviceId),
      O.some,
      currentService.change
    );
