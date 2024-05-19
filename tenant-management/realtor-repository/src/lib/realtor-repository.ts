import * as RealtorDocument from '@ga/realtor-document-in-tenant-management';
import * as RealtorId from '@ga/realtor-id';
import * as O from 'fp-ts/Option';

const db = new Map<RealtorId.T, RealtorDocument.RealtorDocument>();

export const get = () => {
  return {
    create: (document: RealtorDocument.RealtorDocument): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
    get: (id: RealtorId.T): O.Option<RealtorDocument.RealtorDocument> => {
      return O.fromNullable(db.get(id));
    },
    update: (document: RealtorDocument.RealtorDocument) => {
      db.set(document.id, document);
    },
  };
};
