import {
  CreateOffer,
  createOffer,
} from '@ga/create-offer-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';
import * as OfferStruct from '@ga/offet-struct-in-realtor-management';
import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import { flow, identity, pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

export const createOfferApi =
  (publish: (data: OfferStruct.OfferStruct) => void) =>
  (data: CreateOffer): void => {
    return pipe(
      createOffer(data),
      E.chainFirstW(flow(OfferRepository.get().create, E.right)),
      E.map((a) => OfferDocument.codec.encode(a)),
      E.chainFirstW(flow(publish, E.right)),
      E.fold((errors) => {
        console.error('Failed to create an offer.', { errors });
      }, identity)
    );
  };
