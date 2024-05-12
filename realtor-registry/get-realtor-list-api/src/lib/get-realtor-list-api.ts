import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';
import { pipe } from 'fp-ts/function';

export const getRealtorListApi =
  (): ReadonlyArray<RealtorStruct.RealtorStruct> => {
    return pipe(RealtorRepository.getRealtorRepository().getAll());
  };
