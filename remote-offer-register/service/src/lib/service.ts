import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as OfferList from '@ga/offer-list-observable-in-remote-offer-register';
import * as OfferStruct from '@ga/offer-struct-in-remote-offer-register';
import { publishOfferApi } from '@ga/publish-offer-api-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { IObservableValue } from 'mobx';

interface PublishOffer {
  readonly publishOffer: (
    data: OfferDocument.OfferDocument
  ) => OfferDocument.OfferDocument;
}

interface OfferListObservable {
  readonly offerList: Pick<
    IObservableValue<
      O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
    >,
    'get'
  >;
}

type Service = PublishOffer & OfferListObservable;

export const get = (id: ServiceId.ServiceId) => {
  const publishOffer = publishOfferApi(id);
  const offerList = OfferList.getOfferList(id);

  return {
    offerList,
    publishOffer,
  } satisfies Service;
};
