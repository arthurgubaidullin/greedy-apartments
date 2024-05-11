import * as RealtorDocument from '@ga/realtor-document-in-tenant-management';
import * as RealtorId from '@ga/realtor-id';

const db = new Map<RealtorId.T, RealtorDocument.T>();

export const getRealtorRepository = () => {
  return {
    create: (document: RealtorDocument.T): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
  };
};
