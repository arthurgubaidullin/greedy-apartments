import * as RealtorDocument from '@ga/offer-document-in-realtor-management';
import * as RealtorId from '@ga/realtor-id';
import * as OfferId from '@ga/offer-id';

const db: Map<
  RealtorId.T,
  Map<OfferId.T, RealtorDocument.OfferDocument>
> = new Map();

export const get = (realtorId: RealtorId.T) => {
  return {
    create: (document: RealtorDocument.OfferDocument): void => {
      const id = RealtorDocument.getId(document);

      const realtorDb = db.get(realtorId);

      if (!realtorDb) {
        db.set(realtorId, new Map([[id, document]]));
        return;
      }

      if (realtorDb.has(id)) {
        realtorDb.set(id, document);
      }
    },
  };
};
