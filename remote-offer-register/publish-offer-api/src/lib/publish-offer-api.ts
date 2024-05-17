import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as Repository from '@ga/offer-repository-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';
import * as I from 'fp-ts/Identity';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

interface GetCurrentService {
  readonly get: () => O.Option<ServiceId.ServiceId>;
}

export const publishOfferApi =
  (currentService: GetCurrentService) =>
  (publish: (data: OfferDocument.OfferDocument) => void) =>
  (
    data: OfferDocument.OfferDocument
  ): O.Option<OfferDocument.OfferDocument> => {
    return pipe(
      currentService.get(),
      O.map((id) =>
        pipe(
          data,
          I.chainFirst(Repository.get(id).create),
          I.chainFirst(publish)
        )
      )
    );
  };
