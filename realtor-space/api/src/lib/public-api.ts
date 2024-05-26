import * as CurrentServiceApi from '@ga/current-service-api-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { computed } from 'mobx';
import { CreateOffer } from './create-offer';
import * as PrivateApi from './private-api';
import * as PublishedOffersService from './published-offers-service';

interface RemoteOfferListObservable {
  readonly remoteOfferList: ReadonlyObservable<
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
  const privateApi = PrivateApi.get();

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

  const remoteOfferList = computed(() =>
    pipe(
      publishedOffersService.get(),
      O.chain((service) => service.publishedOfferList.get())
    )
  );

  return {
    createOffer: privateApi.createOffer,
    offerList,
    remoteOfferList,
    ...currentServiceIdApi,
  } as const satisfies PublicApi;
};
