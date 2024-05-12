import * as RealtorRepository from '@ga/realtor-repository-in-registry';
import * as RealtorStruct from '@ga/realtor-struct-in-realtor-registry';
import * as RealtorDocument from '@ga/realtor-document-in-registry';
import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';

export const getRealtorListApi =
  (): ReadonlyArray<RealtorStruct.RealtorStruct> => {
    return pipe(
      RealtorRepository.getRealtorRepository().getAll(),
      RA.map(RealtorDocument.toJSON)
    );
  };
