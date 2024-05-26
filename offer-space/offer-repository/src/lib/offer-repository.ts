import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferId from '@ga/offer-id-in-offer-space';
import * as ServiceId from '@ga/service-id-in-offer-space';

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
    getAll: (): ReadonlyArray<OfferDocument.OfferDocument> =>
      Array.from(db.values()),
  };
};
