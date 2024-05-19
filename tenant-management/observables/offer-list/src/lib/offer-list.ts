import * as O from 'fp-ts/Option';
import { IObservableValue, observable } from 'mobx';
import * as OfferStruct from '@ga/offer-struct-in-tenant-management';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';

const create = () =>
  observable.box<O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>>(
    O.none
  );

export const get = (): IObservableValue<
  O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
> => create();
