import * as OfferDocument from '@ga/offer-document-in-realtor-space';
import * as OfferStruct from '@ga/offet-struct-in-realtor-space';
import * as OfferRepository from '@ga/offer-repository-in-realtor-space';
import { pipe } from 'fp-ts/function';
import * as RA from 'fp-ts/ReadonlyArray';

export const getOffetListApi = (): ReadonlyArray<OfferStruct.OfferStruct> =>
  pipe(OfferRepository.get().getAll(), RA.map(OfferDocument.codec.encode));
