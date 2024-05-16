import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';

export const getOffetListApi =
  (): ReadonlyArray<OfferDocument.OfferDocument> => {
    return OfferRepository.get().getAll();
  };
