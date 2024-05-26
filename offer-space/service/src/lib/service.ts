import { changeServiceApi } from '@ga/change-service-api-in-offer-space';
import * as CurrentService from '@ga/current-service-observable-in-offer-space';
import * as OfferAdded from '@ga/offer-added-observable-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferList from '@ga/offer-list-observable-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { publishOfferApi } from '@ga/publish-offer-api-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { computed } from 'mobx';

interface ChangeService {
  readonly changeService: (value: NonEmptyString) => void;
}

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

type Service = PublishOffer & OfferListObservable & ChangeService;

export const get = (): Service => {
  const currentService = CurrentService.create();
  const changeService = changeServiceApi(currentService);

  const offerAdded = OfferAdded.get();

  const publishOffer = publishOfferApi(currentService)(offerAdded.publish);

  const _offerList = OfferList.getOfferList(currentService)(offerAdded);

  const offerList = computed(() =>
    pipe(_offerList.get(), O.map(RNEA.map(OfferStruct.toJSON)))
  );

  return {
    offerList,
    publishOffer,
    changeService,
  };
};
