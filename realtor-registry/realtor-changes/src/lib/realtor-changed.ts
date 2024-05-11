import * as t from 'io-ts';
import * as RealtorId from '@ga/realtor-id';
import { JsonFromString } from 'io-ts-types';
import { pipe } from 'fp-ts/function';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorChanged extends t.TypeOf<typeof RealtorChanged> {}

export const RealtorChanged = pipe(
  t.strict({
    _tag: t.literal('RealtorChanged'),
    id: RealtorId.codec,
    name: t.string,
  }),
  t.readonly,
  JsonFromString.pipe,
  t.string.pipe
);
