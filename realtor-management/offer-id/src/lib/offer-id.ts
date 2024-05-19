import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferId
  extends Newtype.Newtype<
    { readonly OfferIdInRealtorManagement: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<OfferId>(NonEmptyString);

const iso = Newtype.iso<OfferId>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);
