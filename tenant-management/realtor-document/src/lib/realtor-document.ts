import * as RealtorId from '@ga/realtor-id';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorDocument extends t.TypeOf<typeof RealtorDocument> {}

export const RealtorDocument = t.strict({
  id: RealtorId.codec,
  name: t.string,
});
