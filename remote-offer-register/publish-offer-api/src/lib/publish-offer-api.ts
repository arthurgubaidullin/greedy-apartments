import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as Repository from '@ga/offer-repository-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';
import * as I from 'fp-ts/Identity';
import { pipe } from 'fp-ts/function';

export const publishOfferApi =
  (id: ServiceId.ServiceId) =>
  (publish: (data: OfferDocument.OfferDocument) => void) =>
  (data: OfferDocument.OfferDocument): OfferDocument.OfferDocument => {
    return pipe(
      data,
      I.chainFirst(Repository.get(id).create),
      I.chainFirst(publish)
    );
  };
