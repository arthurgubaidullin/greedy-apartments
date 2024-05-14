import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as Repository from '@ga/offer-repository-in-remote-offer-register';
import * as ServiceId from '@ga/service-id-in-remote-offer-register';

export const getOfferListApi = (
  id: ServiceId.ServiceId
): ReadonlyArray<OfferDocument.OfferDocument> => {
  return Repository.get(id).getAll();
};
