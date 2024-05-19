import * as RealtorId from '@ga/realtor-id-in-realtor-registry';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T extends t.TypeOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: RealtorId.codec,
    name: t.string,
  })
);

export const getRealtorId = (document: T): RealtorId.T =>
  pipe(document, (a) => a.id);

export const toJSON = (document: T) => codec.encode(document);
