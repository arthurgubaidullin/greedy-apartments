import * as OfferId from '@ga/offer-id';
import * as _Eq from 'fp-ts/Eq';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OfferStruct extends t.TypeOf<typeof OfferStruct> {}

export const OfferStruct = t.readonly(
  t.strict({
    id: OfferId.codec,
    name: t.string,
  })
);

export const Eq = _Eq.struct({
  id: _Eq.eqStrict,
  name: _Eq.eqStrict,
});
