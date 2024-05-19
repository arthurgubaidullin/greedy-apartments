import * as OfferStruct from '@ga/offer-struct-in-tenant-management';
import * as _Eq from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { IObservableValue, observable } from 'mobx';

const create = () =>
  observable.box<O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>>(
    O.none,
    {
      equals: O.getEq(RNEA.getEq(OfferStruct.Eq)).equals,
    } satisfies _Eq.Eq<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >
  );

export const get = (): IObservableValue<
  O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
> => create();
