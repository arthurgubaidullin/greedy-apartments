import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';
import { pipe } from 'fp-ts/function';
import * as RA from 'fp-ts/ReadonlyArray';

export const getOffetListApi = (): ReadonlyArray<OfferStruct.OfferStruct> =>
  pipe(OfferRepository.get().getAll(), RA.map(OfferDocument.codec.encode));
