import { OfferDocument } from '@ga/offer-document-in-tenant-management';
import * as OfferId from '@ga/offer-id';
import * as O from 'fp-ts/Option';

const db = new Map<OfferId.T, OfferDocument>();

export const get = () => {
  return {
    create: (document: OfferDocument): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
    get: (id: OfferId.T): O.Option<OfferDocument> => {
      return O.fromNullable(db.get(id));
    },
    update: (document: OfferDocument) => {
      db.set(document.id, document);
    },
  };
};
