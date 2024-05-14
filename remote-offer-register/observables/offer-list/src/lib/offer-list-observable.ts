import * as OfferDocument from '@ga/offer-document-in-remote-offer-register';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as _Eq from 'fp-ts/Eq';
import { IObservableValue, observable } from 'mobx';

type T = O.Option<RNEA.ReadonlyNonEmptyArray<OfferDocument.OfferDocument>>;

const _offerList = observable.box<T>(O.none, {
  equals: O.getEq(RNEA.getEq(OfferDocument.Eq)).equals,
} satisfies _Eq.Eq<T>);

export const offerList: Pick<IObservableValue<T>, 'get'> = _offerList;
