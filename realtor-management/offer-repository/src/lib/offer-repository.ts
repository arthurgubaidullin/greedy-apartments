import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as RealtorId from '@ga/realtor-id';
import * as OfferId from '@ga/offer-id';

const db: Map<
  RealtorId.T,
  Map<OfferId.T, OfferDocument.OfferDocument>
> = new Map();

const getRealtorDB = (
  realtorId: RealtorId.T
): Map<OfferId.T, OfferDocument.OfferDocument> => {
  let realtorDb = db.get(realtorId);

  if (!realtorDb) {
    realtorDb = new Map();
    db.set(realtorId, realtorDb);
  }

  return realtorDb;
};

export const get = (realtorId: RealtorId.T) => {
  const db = getRealtorDB(realtorId);

  return {
    create: (document: OfferDocument.OfferDocument): void => {
      if (!db.has(document.id)) {
        db.set(document.id, document);
      }
    },
    getAll: (): ReadonlyArray<OfferDocument.OfferDocument> => {
      return Array.from(db.values());
    },
  };
};
