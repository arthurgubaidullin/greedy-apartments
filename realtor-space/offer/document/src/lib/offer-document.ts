import * as OfferId from '@ga/offer-id-in-realtor-space';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import { failure } from 'io-ts/PathReporter';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SimplifiedOfferDocument extends t.OutputOf<typeof codec> {}

export const parse = (data: SimplifiedOfferDocument) =>
  pipe(data, codec.decode, E.mapLeft(failure));

export const getId = (document: OfferDocument): OfferId.OfferId =>
  pipe(document, (a) => a.id);
