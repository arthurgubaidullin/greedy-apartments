import { registerRealtorApi } from '@ga/register-realtor-api-in-registry';

export const get = () => {
  return {
    registerRealtor: registerRealtorApi,
  } as const;
};
