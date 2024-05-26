import * as RealtorSpace from '@ga/api-in-realtor-space';
import * as TenantSpaceService from '@ga/public-api-in-tenant-space';
import * as RealtorRegistry from '@ga/api-in-registry';

export const realtorSpace = RealtorSpace.get();

export const realtorRegistry = RealtorRegistry.get();

export const tenantManagement = TenantSpaceService.get(realtorRegistry);
