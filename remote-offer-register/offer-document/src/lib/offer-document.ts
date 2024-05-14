import * as OfferId from '@ga/offer-id-in-remote-offer-register';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);
