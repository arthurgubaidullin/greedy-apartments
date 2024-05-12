import * as OfferId from '@ga/offer-id';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

export function offerInRealtorManagement(): string {
  return 'offer-in-realtor-management';
}

const Offer = t.strict({
  id: OfferId.codec,
  name: t.string,
});

export type SimplifiedOffer = t.TypeOf<typeof Offer>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Offer
  extends Newtype.Newtype<{ readonly Offer: unique symbol }, SimplifiedOffer> {}

export const codec = fromNewtype<Offer>(Offer);

const iso = Newtype.iso<Offer>();

export const create = (data: SimplifiedOffer): Offer => pipe(data, iso.wrap);
