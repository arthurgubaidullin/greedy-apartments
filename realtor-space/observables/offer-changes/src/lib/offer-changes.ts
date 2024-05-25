import { observable } from 'mobx';
import { Eq } from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as OfferAdded from './offer-added';

type OfferAddedOption = O.Option<OfferAdded.OfferAdded>;

export const offerAdded = observable.box<OfferAddedOption>(O.none, {
  equals: O.getEq(OfferAdded.Eq).equals,
} satisfies Eq<OfferAddedOption>);
