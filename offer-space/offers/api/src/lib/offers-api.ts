import * as OfferAdded from '@ga/offer-added-store-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferList from '@ga/offer-list-store-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import { ServiceId } from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { computed } from 'mobx';
import { getOfferListApi as getOfferList } from './get-offer-list';
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

  const _offerList = OfferList.get(getOfferList)(serviceId)(offerAdded);

  const offerList = computed(() =>
    pipe(_offerList.get(), O.map(RNEA.map(OfferStruct.toJSON)))
  );

  return {
    publishOffer: _publishOffer,
    offerList,
  } as const;
};
