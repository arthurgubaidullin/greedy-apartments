import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function';
import { createOffer } from './create-offer';

interface PublishOffer {
  readonly publish: (data: OfferDocument.OfferDocument) => void;
}

export const publishOfferApi =
  (P: PublishOffer) =>
  (id: ServiceId.ServiceId) =>
  (
    data: OfferDocument.OfferDocumentSimplifed
  ): O.Option<OfferDocument.OfferDocument> =>
    pipe(data, createOffer(id), O.chainFirst(flow(P.publish, O.some)));
