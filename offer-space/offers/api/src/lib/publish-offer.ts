import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as Repository from '@ga/offers-repository-in-memory-in-offer-space';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as E from 'fp-ts/Either';
import * as I from 'fp-ts/Identity';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

interface PublishOffer {
  readonly publish: (data: OfferDocument.OfferDocument) => void;
}

export const publishOfferApi =
  (P: PublishOffer) =>
  (id: ServiceId.ServiceId) =>
  (
    data: OfferDocument.OfferDocumentSimplifed
  ): O.Option<OfferDocument.OfferDocument> =>
    pipe(
      data,
      OfferDocument.parse,
      E.map((document) =>
        pipe(
          document,
          I.chainFirst(Repository.get(id).create),
          I.chainFirst(P.publish)
        )
      ),
      E.fold((e) => {
        console.error(e);
        return O.none;
      }, O.some)
    );
