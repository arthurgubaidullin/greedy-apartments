import * as OfferList from '@ga/offer-list-store-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import * as ServiceId from '@ga/service-id-in-offer-space';
import * as I from 'fp-ts/Identity';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { constVoid, flow, pipe } from 'fp-ts/function';
import { autorun, onBecomeObserved, onBecomeUnobserved } from 'mobx';

export const getOfferListStore =
  (P: {
    getOfferList: (
      id: ServiceId.ServiceId
    ) => ReadonlyArray<OfferStruct.OfferStruct>;
    offerAdded: ReadonlyObservable<O.Option<OfferStruct.OfferStruct>>;
  }) =>
  (
    id: ServiceId.ServiceId
  ): ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStruct>>
  > => {
    const offerListStore = OfferList.get();

    const _update = () =>
      pipe(P.getOfferList(id), OfferList.update(offerListStore));

    let unsubscribe = constVoid;

    onBecomeObserved(offerListStore, () => {
      _update();

      unsubscribe = autorun(() =>
        pipe(P.offerAdded.get(), O.fold(constVoid, _update))
      );
    });

    onBecomeUnobserved(
      offerListStore,
      flow(unsubscribe, I.chainFirst(OfferList.reset(offerListStore)))
    );

    return offerListStore;
  };
