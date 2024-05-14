import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as OfferId from '@ga/offer-id-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';

const db: Map<
  ServiceId.ServiceId,
  Map<OfferId.OfferId, OfferDocument.OfferDocument>
> = new Map();

const getOfferDB = (
  id: ServiceId.ServiceId
): Map<OfferId.OfferId, OfferDocument.OfferDocument> => {
  let realtorDb = db.get(id);

  if (!realtorDb) {
    realtorDb = new Map();
    db.set(id, realtorDb);
  }

  return realtorDb;
};

export const get = (id: ServiceId.ServiceId) => {
  const db = getOfferDB(id);

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