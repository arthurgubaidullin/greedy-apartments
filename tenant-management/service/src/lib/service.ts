import * as RealtorList from '@ga/realtor-list-in-tenant-management';

export const get = () => {
  return {
    realtorList: RealtorList.get(),
  } as const;
};
