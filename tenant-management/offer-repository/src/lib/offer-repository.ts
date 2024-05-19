import { OfferDocument } from '@ga/offer-document-in-tenant-management';
import * as OfferId from '@ga/offer-id-in-tenant-management';
import * as O from 'fp-ts/Option';

const db = new Map<OfferId.OfferId, OfferDocument>();

export const get = () => {
  return {
    create: (document: OfferDocument): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
    get: (id: OfferId.OfferId): O.Option<OfferDocument> => {
      return O.fromNullable(db.get(id));
    },
    update: (document: OfferDocument) => {
      db.set(document.id, document);
    },
  };
};
