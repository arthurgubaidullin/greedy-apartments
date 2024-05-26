import { CreateOffer, createOffer } from '@ga/create-offer-in-realtor-space';
import * as OfferRepository from '@ga/offers-repository-in-realtor-space';
import * as OfferStruct from '@ga/offer-struct-in-realtor-space';
import * as OfferDocument from '@ga/offer-document-in-realtor-space';
import { flow, identity, pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

export const createOfferApi =
  (publish: (data: OfferStruct.OfferStruct) => void) =>
  (data: CreateOffer): void =>
    pipe(
      createOffer(data),
      E.chainFirstW(flow(OfferRepository.get().create, E.right)),
      E.map((a) => OfferDocument.codec.encode(a)),
      E.chainFirstW(flow(publish, E.right)),
      E.fold((errors) => {
        console.error('Failed to create an offer.', { errors });
      }, identity)
    );
