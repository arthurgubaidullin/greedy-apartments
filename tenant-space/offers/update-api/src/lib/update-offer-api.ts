import * as OfferDocument from '@ga/offer-document-in-tenant-space';
import * as OfferRepository from '@ga/offer-repository-in-tenant-space';
import * as OfferStruct from '@ga/offer-struct-in-tenant-space';
import * as Console from 'fp-ts/Console';
import * as IO from 'fp-ts/IO';
import * as IOO from 'fp-ts/IOOption';
import { pipe } from 'fp-ts/function';

const repository = OfferRepository.get();

const updateOfferDocument = (
  document: OfferDocument.OfferDocument
): IO.IO<void> =>
  pipe(
    repository.get(document.id),
    IOO.fromOption,
    IOO.fold(
      () => IO.of(repository.create(document)),
      () => IO.of(repository.update(document))
    ),
    IO.chainFirst(() => Console.info(`Offer document created in tenant space.`))
  );

export const updateOffer = (data: OfferStruct.OfferStruct): void =>
  pipe(data, OfferDocument.fromSimplified, updateOfferDocument, (f) => f());
