import * as RealtorDocument from '@ga/realtor-document-in-tenant-space';
import * as RealtorRepository from '@ga/realtor-repository-in-tenant-space';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-space';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';

const repository = RealtorRepository.get();

const getRealtorDocumentList =
  (): ReadonlyArray<RealtorDocument.RealtorDocument> => repository.getList();

export const getRealtorListApi =
  (): ReadonlyArray<RealtorStruct.RealtorStruct> =>
    pipe(getRealtorDocumentList(), RA.map(RealtorDocument.toJSON));
