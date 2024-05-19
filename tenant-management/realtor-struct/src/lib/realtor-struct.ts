import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorStruct extends t.TypeOf<typeof codec> {}

export const codec = t.strict({
  id: NonEmptyString,
  name: t.string,
});
