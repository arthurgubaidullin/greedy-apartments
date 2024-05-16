import * as OfferId from '@ga/offer-id';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

export const getId = (document: OfferDocument): OfferId.T =>
  pipe(document, (a) => a.id);
