import * as OfferDocument from '@ga/offer-document-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OfferRepository from '@ga/offers-repository-in-realtor-space';
import { pipe } from 'fp-ts/function';
import * as RA from 'fp-ts/ReadonlyArray';

export const getOfferListApi = (): ReadonlyArray<OfferStruct.OfferStruct> =>
  pipe(OfferRepository.get().getAll(), RA.map(OfferDocument.codec.encode));
