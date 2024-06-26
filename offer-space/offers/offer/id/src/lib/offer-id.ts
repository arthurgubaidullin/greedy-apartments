import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferId
  extends Newtype.Newtype<
    { readonly OfferId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<OfferId>(NonEmptyString);

export const Eq: _Eq.Eq<OfferId> = Newtype.getEq<OfferId>(S.Eq);

const iso = Newtype.iso<OfferId>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);

export const toString = (id: OfferId): NonEmptyString => iso.unwrap(id);
