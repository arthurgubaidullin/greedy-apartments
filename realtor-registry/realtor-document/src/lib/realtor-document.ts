import * as RealtorId from '@ga/realtor-id-in-realtor-registry';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import * as RealtorServiceId from '@ga/realtor-service-id-in-realtor-registry';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RealtorDocument extends t.TypeOf<typeof codec> {}

export type RealtorDocumentSimplified = t.OutputOf<typeof codec>;

export const codec = t.readonly(
  t.strict({
    id: RealtorId.codec,
    name: t.string,
    serviceId: RealtorServiceId.codec,
  })
);

export const getRealtorId = (document: RealtorDocument): RealtorId.RealtorId =>
  pipe(document, (a) => a.id);

export const toJSON = (document: RealtorDocument) => codec.encode(document);

export const fromSimplified = (
  data: RealtorDocumentSimplified
): RealtorDocument => ({
  id: RealtorId.fromNonEmptyString(data.id),
  name: data.name,
  serviceId: RealtorServiceId.fromNonEmptyString(data.serviceId),
});
