import { IObservableValue } from 'mobx';

export type ReadonlyObservable<T> = Pick<IObservableValue<T>, 'get'>;
