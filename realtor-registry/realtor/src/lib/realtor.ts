import * as RealtorId from '@ga/realtor-id';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { fromNewtype } from 'io-ts-types';
import * as Newtype from 'newtype-ts';

export function realtorInRegistry(): string {
  return 'realtor-in-registry';
}

const Realtor = t.strict({
  id: RealtorId.codec,
  name: t.string,
});

export type Simplified = t.TypeOf<typeof Realtor>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T
  extends Newtype.Newtype<{ readonly Realtor: unique symbol }, Simplified> {}

export const codec = fromNewtype<T>(Realtor);

const iso = Newtype.iso<T>();

export const create = (data: Simplified): T => pipe(data, iso.wrap);
