import * as RealtorId from '@ga/realtor-id';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T extends t.TypeOf<typeof codec> {}

export const codec = t.strict({
  id: RealtorId.codec,
  name: t.string,
});
