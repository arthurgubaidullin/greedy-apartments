import * as RealtorId from '@ga/realtor-id';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorDocument extends t.TypeOf<typeof codec> {}

export const codec = t.strict({
  id: RealtorId.codec,
  name: t.string,
});

export const fromSimplified = (
  data: t.OutputOf<typeof codec>
): RealtorDocument => ({
  id: RealtorId.fromNonEmptyString(data.id),
  name: data.name,
});
