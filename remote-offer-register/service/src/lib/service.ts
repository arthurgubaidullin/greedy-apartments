import { changeServiceApi } from '@ga/change-service-api-in-remote-offer-register';
import * as CurrentService from '@ga/current-service-observable-in-remote-offer-register';
import * as OfferAdded from '@ga/offer-added-observable-in-remote-offer-register';
import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as OfferList from '@ga/offer-list-observable-in-remote-offer-register';
import * as OfferStruct from '@ga/offer-struct-in-remote-offer-register';
import { publishOfferApi } from '@ga/publish-offer-api-in-remote-offer-register';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { NonEmptyString } from 'io-ts-types';
import { IObservableValue } from 'mobx';

interface ChangeService {
  readonly changeService: (value: NonEmptyString) => void;
}

interface PublishOffer {
  readonly publishOffer: (
    data: OfferDocument.OfferDocumentSimplifed
  ) => O.Option<OfferDocument.OfferDocument>;
}

interface OfferListObservable {
  readonly offerList: Pick<
    IObservableValue<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >,
    'get'
  >;
}

type Service = PublishOffer & OfferListObservable & ChangeService;

export const get = () => {
  const currentService = CurrentService.create();
  const changeService = changeServiceApi(currentService);

  const offerAdded = OfferAdded.get();

  const publishOffer = publishOfferApi(currentService)(offerAdded.publish);

  const offerList = OfferList.getOfferList(currentService)(offerAdded);

  return {
    offerList,
    publishOffer,
    changeService,
  } as const satisfies Service;
};
