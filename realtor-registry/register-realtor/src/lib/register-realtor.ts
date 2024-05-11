import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as Realtor from '@ga/realtor-in-registry';

export const registerRealtor = (
  data: Realtor.Simplified
): RealtorDocument.T => {
  return Realtor.create(data);
};
