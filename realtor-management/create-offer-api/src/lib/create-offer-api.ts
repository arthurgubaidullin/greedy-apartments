import {
  CreateOffer,
  createOffer,
} from '@ga/create-offer-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';
import { identity, pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

export const createOfferApi = (data: CreateOffer): void => {
  return pipe(
    createOffer(data),
    E.map(OfferRepository.get().create),
    E.fold((errors) => {
      console.error('Failed to create an offer.', { errors });
    }, identity)
  );
};
