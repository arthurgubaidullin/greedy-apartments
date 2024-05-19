import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T
  extends Newtype.Newtype<
    { readonly RealtorId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<T>(NonEmptyString);

const iso = Newtype.iso<T>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);
