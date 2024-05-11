import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as Realtor from '@ga/realtor-in-registry';

export type RegisterRealtor = Realtor.Simplified;

export const registerRealtor = (data: RegisterRealtor): RealtorDocument.T => {
  return Realtor.create(data);
};
