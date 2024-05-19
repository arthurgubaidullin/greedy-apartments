import { registerRealtorApi } from '@ga/register-realtor-api-in-registry';
import { realtorList } from '@ga/realtor-list-observable-in-realtor-registry';

export const get = () => {
  return {
    registerRealtor: registerRealtorApi,
    realtorList,
  } as const;
};
