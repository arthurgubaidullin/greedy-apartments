import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as Realtor from '@ga/realtor-in-registry';
import { pipe } from 'fp-ts/function';

export type RegisterRealtor = RealtorDocument.RealtorDocumentSimplified;

export const registerRealtor = (
  data: RegisterRealtor
): RealtorDocument.RealtorDocument => pipe(
    data,
    RealtorDocument.fromSimplified,
    Realtor.create,
    Realtor.toJSON
  );
