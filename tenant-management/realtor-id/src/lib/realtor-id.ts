import { pipe } from 'fp-ts/function';
import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/string';
import { FailedToCreateRealtorId } from './failed-to-create-realtor-id';
import * as _Eq from 'fp-ts/Eq';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorId
  extends Newtype.Newtype<
    { readonly RealtorId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<RealtorId>(NonEmptyString);

export const Eq: _Eq.Eq<RealtorId> = Newtype.getEq<RealtorId>(S.Eq);

const iso = Newtype.iso<RealtorId>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);

export const fromString = (
  s: string
): E.Either<FailedToCreateRealtorId, RealtorId> =>
  pipe(
    s,
    E.fromPredicate(NonEmptyString.is, () => new FailedToCreateRealtorId()),
    E.map(fromNonEmptyString)
  );

export const toString = (id: RealtorId): NonEmptyString => iso.unwrap(id);
