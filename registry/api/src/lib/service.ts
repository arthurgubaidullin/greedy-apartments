import { registerRealtorApi } from '@ga/register-realtor-api-in-registry';
import { realtorList } from '@ga/realtor-list-observable-in-registry';
import { realtorAdded } from '@ga/realtor-added-observable-in-registry';

export const get = () =>
  ({
    registerRealtor: registerRealtorApi,
    realtorList,
    realtorAdded,
  } as const);
