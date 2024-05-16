import {
  CreateOffer,
  createOffer,
} from '@ga/create-offer-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';
import { pipe } from 'fp-ts/function';

export const createOfferApi = (data: CreateOffer): void => {
  return pipe(createOffer(data), OfferRepository.get().create);
};
