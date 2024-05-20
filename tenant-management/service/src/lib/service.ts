import * as OfferList from '@ga/offer-list-in-tenant-management';
import * as RealtorList from '@ga/realtor-list-in-tenant-management';
import { RealtorStruct } from '@ga/realtor-struct-in-tenant-management';
import { updateRealtor } from '@ga/update-realtor-api-in-tenant-management';
import * as O from 'fp-ts/Option';
import { IObservableValue } from 'mobx';
import { subscribeToRealtorRegisterApi } from '@ga/subscribe-to-realtor-register-api-in-tenant-management';

export const get = (data: {
  realtorAdded: Pick<IObservableValue<O.Option<RealtorStruct>>, 'get'>;
}) => {
  const unsubscribe = subscribeToRealtorRegisterApi(data.realtorAdded);

  return {
    realtorList: RealtorList.get(),
    offerList: OfferList.get(),
    updateRealtor: updateRealtor,
    unsubscribe,
  } as const;
};
