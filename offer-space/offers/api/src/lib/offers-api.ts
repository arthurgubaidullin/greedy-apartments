import * as OfferAdded from '@ga/offer-added-store-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import { ServiceId } from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { getOfferListApi as getOfferList } from './get-offer-list';
import { getOfferListStore } from './get-offer-list-store';
import { publishOfferApi as publishOffer } from './publish-offer';

interface PublishOffer {
  readonly publishOffer: (
    data: OfferDocument.OfferDocumentSimplifed
  ) => O.Option<OfferDocument.OfferDocument>;
}

interface OfferListObservable {
  readonly offerList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStructSimplified>>
  >;
}

type Service = PublishOffer & OfferListObservable;

export const get = (serviceId: ServiceId): Service => {
  const offerAdded = OfferAdded.get();

  const _publishOffer = publishOffer(offerAdded)(serviceId);

  const offerList = getOfferListStore({ getOfferList, offerAdded })(serviceId);

  return {
    publishOffer: _publishOffer,
    offerList,
  } as const;
};
