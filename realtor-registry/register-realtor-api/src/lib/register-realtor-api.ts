import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import { RegisterRealtor, registerRealtor } from '@ga/register-realtor';
import { pipe } from 'fp-ts/function';

const repository = RealtorRepository.getRealtorRepository();

export const registerRealtorApi = (data: RegisterRealtor): void => {
  return pipe(data, registerRealtor, repository.create);
};
