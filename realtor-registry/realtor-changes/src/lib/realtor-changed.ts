import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { JsonFromString, NonEmptyString } from 'io-ts-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorChanged extends t.TypeOf<typeof RealtorChanged> {}

export const RealtorChanged = pipe(
  t.strict({
    _tag: t.literal('RealtorChanged'),
    id: NonEmptyString,
    name: t.string,
  }),
  t.readonly,
  JsonFromString.pipe,
  t.string.pipe
);
