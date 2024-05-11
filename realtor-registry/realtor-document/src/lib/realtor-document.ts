import * as Realtor from '@ga/realtor-in-registry';
import * as t from 'io-ts';
import * as RealtorId from '@ga/realtor-id';
import { pipe } from 'fp-ts/function';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T extends t.TypeOf<typeof codec> {}

export const codec = Realtor.codec;

export const getRealtorId = (document: T): RealtorId.T =>
  pipe(document, codec.encode, (a) => a.id);
