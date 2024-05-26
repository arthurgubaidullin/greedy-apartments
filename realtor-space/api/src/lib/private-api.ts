import { createOfferApi } from '@ga/create-offer-api-in-realtor-space';
import * as OfferAdded from '@ga/offer-added-observable-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OfferList from '@ga/offet-list-observable-in-realtor-space';
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

  return {
    offerList: OfferList.get(_offerAdded),
    createOffer: createOfferApi(_offerAdded.publish),
  } as const satisfies PrivateApi;
};
