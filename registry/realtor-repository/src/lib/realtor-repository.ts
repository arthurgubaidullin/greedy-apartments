import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as RealtorId from '@ga/realtor-id-in-registry';

const db = new Map<RealtorId.RealtorId, RealtorDocument.RealtorDocument>();

export const getRealtorRepository = () => ({
  create: (document: RealtorDocument.RealtorDocument): void => {
    const id = RealtorDocument.getRealtorId(document);

    if (!db.has(id)) {
      db.set(id, document);
    }
  },
  getAll: (): ReadonlyArray<RealtorDocument.RealtorDocument> =>
    Array.from(db.values()),
});
