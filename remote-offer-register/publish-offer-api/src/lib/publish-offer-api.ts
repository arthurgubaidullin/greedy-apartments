import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as Repository from '@ga/offer-repository-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';
import * as E from 'fp-ts/Either';
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
    data: OfferDocument.OfferDocumentSimplifed
  ): O.Option<OfferDocument.OfferDocument> => pipe(
      currentService.get(),
      O.chain((id) =>
        pipe(
          data,
          OfferDocument.parse,
          E.map((document) =>
            pipe(
              document,
              I.chainFirst(Repository.get(id).create),
              I.chainFirst(publish)
            )
          ),
          E.fold((e) => {
            console.error(e);
            return O.none;
          }, O.some)
        )
      )
    );
