import * as OfferId from '@ga/offer-id-in-tenant-space';
import * as RealtorId from '@ga/realtor-id-in-tenant-space';
import * as t from 'io-ts';

const OfferDocument = t.strict({
  id: OfferId.codec,
  realtorId: RealtorId.codec,
  name: t.string,
});

export type OfferDocument = t.TypeOf<typeof OfferDocument>;