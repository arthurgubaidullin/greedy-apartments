import * as OffersApi from '@ga/offers-api-in-realtor-space';
import * as OfferAdded from '@ga/offer-added-observable-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OfferList from '@ga/offer-list-store-in-realtor-space';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { ReadonlyObservable } from '@ga/readonly-observable';
import { CreateOffer } from './create-offer';

interface OfferListObservable {
  readonly offerList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
  >;
}

type PrivateApi = CreateOffer & OfferListObservable;

export const get = () => {
  const _offerAdded = OfferAdded.get();

  const offersApi = OffersApi.get(_offerAdded.publish);
  return {
    offerList: OfferList.get(offersApi.getOfferList)(_offerAdded),
    createOffer: offersApi.createOffer,
  } as const satisfies PrivateApi;
};
