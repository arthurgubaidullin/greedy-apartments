import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as OfferId from '@ga/offer-id-in-realtor-management';

const db: Map<OfferId.OfferId, OfferDocument.OfferDocument> = new Map();

export const get = () => ({
    create: (document: OfferDocument.OfferDocument): void => {
      if (!db.has(document.id)) {
        db.set(document.id, document);
      }
    },
    getAll: (): ReadonlyArray<OfferDocument.OfferDocument> => Array.from(db.values()),
  });
