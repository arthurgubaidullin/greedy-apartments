import * as RealtorDocument from '@ga/realtor-document-in-tenant-space';
import * as RealtorId from '@ga/realtor-id-in-tenant-space';
import * as O from 'fp-ts/Option';

const db = new Map<RealtorId.RealtorId, RealtorDocument.RealtorDocument>();

export const get = () => {
  return {
    create: (document: RealtorDocument.RealtorDocument): void => {
      const id = document.id;

      if (db.has(id)) {
        db.set(id, document);
      }
    },
    get: (
      id: RealtorId.RealtorId
    ): O.Option<RealtorDocument.RealtorDocument> => {
      return O.fromNullable(db.get(id));
    },
    update: (document: RealtorDocument.RealtorDocument) => {
      db.set(document.id, document);
    },
    getList: () => {
      return Array.from(db.values());
    },
  };
};
