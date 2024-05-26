import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OffersApi from '@ga/offers-api-in-realtor-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { CreateOffer } from './create-offer';

interface OfferListObservable {
  readonly offerList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
  >;
}

type PrivateApi = CreateOffer & OfferListObservable;

export const get = (): PrivateApi => OffersApi.get();
