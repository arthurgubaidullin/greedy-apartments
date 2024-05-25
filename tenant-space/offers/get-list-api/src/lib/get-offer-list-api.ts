import * as OfferDocument from '@ga/offer-document-in-tenant-space';
import * as OfferRepository from '@ga/offer-repository-in-tenant-space';
import * as OfferStruct from '@ga/offer-struct-in-tenant-space';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';

const repository = OfferRepository.get();

const getOfferDocumentList = (): ReadonlyArray<OfferDocument.OfferDocument> =>
  repository.getList();

export const getOfferListApi = (): ReadonlyArray<OfferStruct.OfferStruct> =>
  pipe(getOfferDocumentList(), RA.map(OfferDocument.toJSON));
