import { topic } from '@ga/realtor-changes-in-registry';
import { updateRealtorDocument } from '@ga/update-realtor-document-in-tenant-management';

export const subscribeToRealtorRegistryApi = (): (() => void) => {
  return topic.subscribe((data) => {
    updateRealtorDocument(data);
  });
};
