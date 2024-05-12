import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import {
  RegisterRealtor,
  registerRealtor,
} from '@ga/register-realtor-in-registry';
import { pipe } from 'fp-ts/function';
import * as RealtorAdded from '@ga/realtor-added-observable-in-realtor-registry';
import { chainFirst } from 'fp-ts/lib/Identity';
import * as RealtorDocument from '@ga/realtor-document-in-registry';

const repository = RealtorRepository.getRealtorRepository();

export const registerRealtorApi = (data: RegisterRealtor): void => {
  return pipe(
    data,
    registerRealtor,
    chainFirst(repository.create),
    RealtorDocument.toJSON,
    RealtorAdded.publish
  );
};
