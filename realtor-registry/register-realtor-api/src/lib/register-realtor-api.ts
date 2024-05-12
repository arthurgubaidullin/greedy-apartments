import * as RealtorAdded from '@ga/realtor-added-observable-in-realtor-registry';
import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import {
  RegisterRealtor,
  registerRealtor,
} from '@ga/register-realtor-in-registry';
import { pipe } from 'fp-ts/function';
import * as I from 'fp-ts/Identity';

const repository = RealtorRepository.getRealtorRepository();

export const registerRealtorApi = (data: RegisterRealtor): void => {
  return pipe(
    data,
    registerRealtor,
    I.chainFirst(repository.create),
    RealtorAdded.publish
  );
};
