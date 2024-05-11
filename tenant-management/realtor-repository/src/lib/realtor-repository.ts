import * as RealtorDocument from '@ga/realtor-document-in-tenant-management';
import * as RealtorId from '@ga/realtor-id';
import * as O from 'fp-ts/Option';

const db = new Map<RealtorId.T, RealtorDocument.T>();

export const getRealtorRepository = () => {
  return {
    create: (document: RealtorDocument.T): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
    get: (id: RealtorId.T): O.Option<RealtorDocument.T> => {
      return O.fromNullable(db.get(id));
    },
    update: (document: RealtorDocument.T) => {
      db.set(document.id, document);
    },
  };
};
