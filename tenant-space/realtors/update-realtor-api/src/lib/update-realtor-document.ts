import * as RealtorDocument from '@ga/realtor-document-in-tenant-space';
import * as RealtorRepository from '@ga/realtor-repository-in-tenant-space';
import * as RealtorStruct from '@ga/realtor-struct-in-tenant-space';
import * as Console from 'fp-ts/Console';
import * as IO from 'fp-ts/IO';
import * as IOO from 'fp-ts/IOOption';
import { pipe } from 'fp-ts/function';

const repository = RealtorRepository.get();

const updateRealtorDocument = (
  document: RealtorDocument.RealtorDocument
): IO.IO<void> =>
  pipe(
    repository.get(document.id),
    IOO.fromOption,
    IOO.fold(
      () => IO.of(repository.create(document)),
      () => IO.of(repository.update(document))
    ),
    IO.chainFirst(() =>
      Console.info(`Realtor document created in tenant space.`)
    )
  );

export const updateRealtor = (data: RealtorStruct.RealtorStruct): void =>
  pipe(data, RealtorDocument.fromSimplified, updateRealtorDocument, (f) => f());
