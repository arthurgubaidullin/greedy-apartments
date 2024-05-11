import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as RealtorId from '@ga/realtor-id';

const db = new Map<RealtorId.T, RealtorDocument.T>();

export const getRealtorRepository = () => {
  return {
    create: (document: RealtorDocument.T): void => {
      const id = RealtorDocument.getRealtorId(document);

      if (db.has(id)) {
        db.set(id, document);
      }
    },
  };
};
