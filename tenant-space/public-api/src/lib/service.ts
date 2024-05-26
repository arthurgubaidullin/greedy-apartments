import * as OfferSpace from '@ga/api-in-offer-space';
import * as RealtorList from '@ga/realtor-list-in-tenant-space';
import { RealtorStruct } from '@ga/realtor-struct-in-tenant-space';
import { subscribeToRealtorRegisterApi } from '@ga/subscribe-to-realtor-register-api-in-tenant-space';
import { updateRealtor } from '@ga/update-realtor-api-in-tenant-space';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import { pipe } from 'fp-ts/function';
import { IObservableValue, computed } from 'mobx';

export const get = (data: {
  realtorAdded: Pick<IObservableValue<O.Option<RealtorStruct>>, 'get'>;
}) => {
  const realtorListStore = RealtorList.get(data.realtorAdded);

  const offerList = computed(() =>
    pipe(
      realtorListStore.get(),
      RA.fromOption,
      RA.flatten,
      RA.flatMap((s) =>
        pipe(
          OfferSpace.get(s.serviceId).offerList.get(),
          RA.fromOption,
          RA.flatten
        )
      ),
      O.fromPredicate(RA.isNonEmpty)
    )
  );

  const unsubscribe = subscribeToRealtorRegisterApi(data.realtorAdded);

  return {
    realtorList: realtorListStore,
    offerList: offerList,
    updateRealtor: updateRealtor,
    unsubscribe,
  } as const;
};
