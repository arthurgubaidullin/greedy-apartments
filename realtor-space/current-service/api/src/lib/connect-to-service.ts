import * as O from 'fp-ts/Option';
import { NonEmptyString } from 'io-ts-types';
import { constVoid, pipe } from 'fp-ts/function';
import { IObservableValue, action } from 'mobx';

export const connectToService = (
  currentServiceId: IObservableValue<O.Option<NonEmptyString>>
) =>
  action((serviceId: NonEmptyString): void =>
    pipe(
      currentServiceId.get(),
      O.fold(
        () =>
          pipe(currentServiceId.set(O.some(serviceId)), () => {
            console.log('The service is connected.');
          }),
        constVoid
      )
    )
  );
