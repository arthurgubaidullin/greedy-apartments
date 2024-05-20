import * as OfferList from '@ga/offer-list-in-tenant-space';
import * as RealtorList from '@ga/realtor-list-in-tenant-space';
import { RealtorStruct } from '@ga/realtor-struct-in-tenant-space';
import { updateRealtor } from '@ga/update-realtor-api-in-tenant-space';
import * as O from 'fp-ts/Option';
import { IObservableValue } from 'mobx';
import { subscribeToRealtorRegisterApi } from '@ga/subscribe-to-realtor-register-api-in-tenant-space';

export const get = (data: {
  realtorAdded: Pick<IObservableValue<O.Option<RealtorStruct>>, 'get'>;
}) => {
  const unsubscribe = subscribeToRealtorRegisterApi(data.realtorAdded);

  return {
    realtorList: RealtorList.get(data.realtorAdded),
    offerList: OfferList.get(),
    updateRealtor: updateRealtor,
    unsubscribe,
  } as const;
};
