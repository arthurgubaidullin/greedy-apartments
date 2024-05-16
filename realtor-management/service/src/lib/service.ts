import { createOfferApi } from '@ga/create-offer-api-in-realtor-management';
import { CreateOffer as _CreateOffer } from '@ga/create-offer-in-realtor-management';
import * as OfferList from '@ga/offet-list-observable-in-realtor-management';
import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { IObservableValue } from 'mobx';

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
    createOffer: createOfferApi,
  } as const satisfies Service;
};
