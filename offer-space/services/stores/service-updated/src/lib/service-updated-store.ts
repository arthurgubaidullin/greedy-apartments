import * as ServiceId from '@ga/service-id-in-offer-space';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import { IObservableValue, action, observable } from 'mobx';

type T = O.Option<{ id: ServiceId.ServiceId; version: number }>;

const create = (): IObservableValue<T> =>
  observable.box<T>(O.none, {
    equals: O.getEq(
      _Eq.struct({
        id: ServiceId.Eq,
        version: N.Eq,
      })
    ).equals,
  } satisfies _Eq.Eq<T>);

const topic = create();

export const get = () => ({
  get: () => topic.get(),
  set: action((id: ServiceId.ServiceId) =>
    topic.set(
      O.some({
        id,
        version: pipe(
          topic.get(),
          O.fold(
            () => 0,
            (a) => a.version + 1
          )
        ),
      })
    )
  ),
});
