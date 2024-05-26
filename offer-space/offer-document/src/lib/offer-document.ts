import * as OfferId from '@ga/offer-id-in-offer-space';
import * as E from 'fp-ts/Either';
import * as _Eq from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocument extends t.TypeOf<typeof codec> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferDocumentSimplifed extends t.OutputOf<typeof codec> {}

export const codec = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

export const parse = (
  data: OfferDocumentSimplifed
): E.Either<string[], OfferDocument> =>
  pipe(data, codec.decode, E.mapLeft(failure));

export const Eq: _Eq.Eq<OfferDocument> = _Eq.struct({
  id: OfferId.Eq,
  name: S.Eq,
});
