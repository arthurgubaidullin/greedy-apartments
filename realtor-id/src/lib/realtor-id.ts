import { pipe } from 'fp-ts/function';
import { NonEmptyString, fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';
import * as E from 'fp-ts/Either';
import { FailedToCreateRealtorId } from './failed-to-create-realtor-id';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T
  extends Newtype.Newtype<
    { readonly RealtorId: unique symbol },
    NonEmptyString
  > {}

export const codec = fromNewtype<T>(NonEmptyString);

const iso = Newtype.iso<T>();

export const fromNonEmptyString = (s: NonEmptyString) => iso.wrap(s);

export const fromString = (s: string): E.Either<FailedToCreateRealtorId, T> =>
  pipe(
    s,
    E.fromPredicate(NonEmptyString.is, () => new FailedToCreateRealtorId()),
    E.map(fromNonEmptyString)
  );
