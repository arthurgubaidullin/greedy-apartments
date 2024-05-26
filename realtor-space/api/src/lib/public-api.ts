import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { constVoid, pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { computed, observable } from 'mobx';
import { CreateOffer } from './create-offer';
import * as PrivateApi from './private-api';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as CurrentServiceApi from '@ga/current-service-api-in-realtor-space';

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

  const offerList = computed(() =>
    pipe(
      privateApi.offerList.get(),
      O.map(RNEA.map((struct) => ({ ...struct, publish: constVoid })))
    )
  );

  return {
    createOffer: privateApi.createOffer,
    offerList,
    remoteOfferList: observable.box<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >(O.none),
    ...currentServiceIdApi,
  } as const satisfies PublicApi;
};
