import * as _Eq from 'fp-ts/Eq';
import * as S from 'fp-ts/string';
import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceId
  extends Newtype.Newtype<
    { readonly ServiceId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<ServiceId>(NonEmptyString);

export const Eq: _Eq.Eq<ServiceId> = Newtype.getEq<ServiceId>(S.Eq);

const iso = Newtype.iso<ServiceId>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);

export const toString = (id: ServiceId): NonEmptyString => iso.unwrap(id);
