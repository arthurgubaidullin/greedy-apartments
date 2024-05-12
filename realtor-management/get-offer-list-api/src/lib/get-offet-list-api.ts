import * as OfferDocument from '@ga/offer-document-in-realtor-management';
import * as OfferRepository from '@ga/offer-repository-in-realtor-management';
import * as RealtorId from '@ga/realtor-id';

export const getOffetListApi = (
  data: Readonly<{
    realtorId: RealtorId.T;
  }>
): ReadonlyArray<OfferDocument.OfferDocument> => {
  return OfferRepository.get(data.realtorId).getAll();
};
