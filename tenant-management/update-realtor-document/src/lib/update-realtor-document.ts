import * as RealtorRepository from '@ga/realtor-repository-in-tenant-management';
import * as RealtorDocument from '@ga/realtor-document-in-tenant-management';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

const repository = RealtorRepository.get();

export const updateRealtorDocument = (
  document: RealtorDocument.RealtorDocument
): void => {
  return pipe(
    repository.get(document.id),
    O.fold(
      () => repository.create(document),
      () => repository.update(document)
    )
  );
};
