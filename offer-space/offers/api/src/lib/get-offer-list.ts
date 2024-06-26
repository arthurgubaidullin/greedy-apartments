import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as Repository from '@ga/offers-repository-in-memory-in-offer-space';
import * as ServiceId from '@ga/service-id-in-offer-space';

export const getOfferListApi = (
  id: ServiceId.ServiceId
): ReadonlyArray<OfferDocument.OfferDocument> => Repository.get(id).getAll();
