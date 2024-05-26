import * as OfferAdded from '@ga/offer-added-store-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferList from '@ga/offer-list-store-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import { ServiceId } from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { computed, observable } from 'mobx';
import { getOfferListApi } from './get-offer-list';
import { publishOfferApi } from './publish-offer';

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

const _get = () =>
  ({
    publishOffer: publishOfferApi,
    getOfferList: getOfferListApi,
  } as const);

export const get = (serviceId: ServiceId): Service => {
  const currentService = observable.box(O.some(serviceId));

  const offerAdded = OfferAdded.get();

  const offersApi = _get();

  const publishOffer = offersApi.publishOffer(currentService)(
    offerAdded.publish
  );

  const _offerList = OfferList.get(offersApi.getOfferList)(currentService)(
    offerAdded
  );

  const offerList = computed(() =>
    pipe(_offerList.get(), O.map(RNEA.map(OfferStruct.toJSON)))
  );

  return {
    publishOffer,
    offerList,
  } as const;
};
