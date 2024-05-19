import * as RealtorAdded from '@ga/realtor-added-observable-in-realtor-registry';
import * as RealtorDocument from '@ga/realtor-document-in-registry';
import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import {
  RegisterRealtor,
  registerRealtor,
} from '@ga/register-realtor-in-registry';
import * as I from 'fp-ts/Identity';
import { pipe } from 'fp-ts/function';

const repository = RealtorRepository.getRealtorRepository();

export const registerRealtorApi = (data: RegisterRealtor): void => {
  return pipe(
    data,
    registerRealtor,
    I.chainFirst(repository.create),
    I.map(RealtorDocument.toJSON),
    RealtorAdded.publish
  );
};
