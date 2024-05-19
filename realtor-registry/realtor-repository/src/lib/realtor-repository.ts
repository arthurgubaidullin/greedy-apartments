import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as RealtorId from '@ga/realtor-id-in-realtor-registry';

const db = new Map<RealtorId.T, RealtorDocument.RealtorDocument>();

export const getRealtorRepository = () => {
  return {
    create: (document: RealtorDocument.RealtorDocument): void => {
      const id = RealtorDocument.getRealtorId(document);

      if (!db.has(id)) {
        db.set(id, document);
      }
    },
    getAll: (): ReadonlyArray<RealtorDocument.RealtorDocument> => {
      return Array.from(db.values());
    },
  };
};
