import * as t from 'io-ts';
import { NonEmptyString } from 'io-ts-types';

const OfferStruct = t.strict({
  id: NonEmptyString,
  realtorId: NonEmptyString,
  name: t.string,
});

export type OfferStruct = t.TypeOf<typeof OfferStruct>;
