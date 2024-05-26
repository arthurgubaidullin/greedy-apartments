import * as ServicesApi from '@ga/services-api-in-offer-space';
import * as CurrentService from '@ga/current-service-store-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import * as OffersApi from '@ga/offers-api-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { action, computed } from 'mobx';
import * as I from 'fp-ts/Identity';
import * as ServiceId from '@ga/service-id-in-offer-space';

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

  const currentService = CurrentService.create();

  servicesApi.changeService(currentService)(serviceId);

  const offersApi = computed(() =>
    pipe(currentService.get(), O.map(OffersApi.get))
  );

  return {
    offerList: computed(() =>
      pipe(
        offersApi.get(),
        I.chainFirst(() => servicesApi.serviceUpdated.get()),
        O.chain((api) => api.offerList.get())
      )
    ),
    publishOffer: action((data) =>
      pipe(
        offersApi.get(),
        O.chain((s) =>
          pipe(
            s.publishOffer(data),
            I.chainFirst(() => servicesApi.serviceUpdated.set(_serviceId))
          )
        )
      )
    ),
  };
};
