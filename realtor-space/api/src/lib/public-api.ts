import * as CurrentServiceApi from '@ga/current-service-api-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OffersApi from '@ga/offers-api-in-realtor-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { computed } from 'mobx';
import * as PublishedOffersService from './published-offers-service';
import { CreateOffer as _CreateOffer } from '@ga/create-offer-in-realtor-space';

export interface CreateOffer {
  readonly createOffer: (data: _CreateOffer) => void;
}

interface RemoteOfferListObservable {
  readonly publishedOfferList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
  >;
}

interface CurrentServiceIdObservable {
  readonly currentServiceId: ReadonlyObservable<O.Option<NonEmptyString>>;
}

interface ConnectToService {
  readonly connectToService: (serviceId: NonEmptyString) => void;
}

interface PublishOffer {
  readonly publish: () => void;
}

interface OfferListObservable {
  readonly offerList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct & PublishOffer>>
  >;
}

type PublicApi = CreateOffer &
  OfferListObservable &
  RemoteOfferListObservable &
  CurrentServiceIdObservable &
  ConnectToService;

export const get = () => {
  const privateApi = OffersApi.get();

  const currentServiceIdApi = CurrentServiceApi.get();

  const publishedOffersService = PublishedOffersService.get(
    currentServiceIdApi.currentServiceId
  );

  const offerList = computed(() =>
    pipe(
      privateApi.offerList.get(),
      O.map(
        RNEA.map((struct: OfferStruct.OfferStruct) => ({
          ...struct,
          publish: () =>
            pipe(
              publishedOffersService.get(),
              O.chain((s) => s.publishOffer(struct))
            ),
        }))
      )
    )
  );

  const publishedOfferList = computed(() =>
    pipe(
      publishedOffersService.get(),
      O.chain((service) => service.publishedOfferList.get())
    )
  );

  return {
    createOffer: privateApi.createOffer,
    offerList,
    publishedOfferList,
    ...currentServiceIdApi,
  } as const satisfies PublicApi;
};
