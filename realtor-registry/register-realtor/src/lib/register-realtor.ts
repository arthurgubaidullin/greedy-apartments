import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as Realtor from '@ga/realtor-in-registry';
import { pipe } from 'fp-ts/function';

export type RegisterRealtor = Realtor.Simplified;

export const registerRealtor = (data: RegisterRealtor): RealtorDocument.T => {
  return pipe(Realtor.create(data), Realtor.toJSON);
};
