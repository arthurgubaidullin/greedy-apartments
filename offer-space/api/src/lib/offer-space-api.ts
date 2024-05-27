import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import * as OffersApi from '@ga/offers-api-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as ServicesApi from '@ga/services-api-in-offer-space';
import * as I from 'fp-ts/Identity';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { action, computed } from 'mobx';

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

export const get = (serviceId: NonEmptyString): Service => {
  const _serviceId = ServiceId.fromNonEmptyString(serviceId);

  const servicesApi = ServicesApi.get();

  const offersApi = OffersApi.get(_serviceId);

  return {
    offerList: computed(() =>
      pipe(
        offersApi.offerList.get(),
        I.chainFirst(() => servicesApi.serviceUpdated.get())
      )
    ),
    publishOffer: action((data) =>
      pipe(
        pipe(
          offersApi.publishOffer(data),
          O.map(I.chainFirst(() => servicesApi.serviceUpdated.set(_serviceId)))
        )
      )
    ),
  };
};
