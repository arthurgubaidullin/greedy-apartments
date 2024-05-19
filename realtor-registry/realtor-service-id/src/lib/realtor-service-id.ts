import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorServiceId
  extends Newtype.Newtype<
    { readonly RealtorServiceId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<RealtorServiceId>(NonEmptyString);

export const Eq: _Eq.Eq<RealtorServiceId> = Newtype.getEq<RealtorServiceId>(
  S.Eq
);

const iso = Newtype.iso<RealtorServiceId>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);
