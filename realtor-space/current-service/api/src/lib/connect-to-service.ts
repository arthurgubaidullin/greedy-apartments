import * as O from 'fp-ts/Option';
import { NonEmptyString } from 'io-ts-types';
import { constVoid, pipe } from 'fp-ts/function';
import { IObservableValue, action } from 'mobx';

export const connectToService = (
  currentServiceId: IObservableValue<O.Option<NonEmptyString>>
) =>
  action((serviceId: NonEmptyString) =>
    pipe(
      currentServiceId.get(),
      O.fold(() => currentServiceId.set(O.some(serviceId)), constVoid)
    )
  );
