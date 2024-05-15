import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import { IObservableValue } from 'mobx';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as OfferList from '@ga/offet-list-observable-in-realtor-management';
import {
  CreateOffer as _CreateOffer,
  createOffer,
} from '@ga/create-offer-in-realtor-management';

interface CreateOffer {
  readonly createOffer: (data: _CreateOffer) => void;
}

interface OfferListObservable {
  readonly offerList: Pick<
    IObservableValue<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >,
    'get'
  >;
}

type Service = CreateOffer & OfferListObservable;

export const get = () => {
  return {
    offerList: OfferList.offerList,
    createOffer: createOffer,
  } as const satisfies Service;
};
