import * as RealtorManagementService from '@ga/service-in-realtor-management';
import * as RemoteOfferService from '@ga/service-in-remote-offer-register';
import * as TenantSpaceService from '@ga/public-api-in-tenant-space';
import * as RealtorRegistry from '@ga/service-in-realtor-registry';

export const realtorManagement = RealtorManagementService.get();

export const remoteOffers = RemoteOfferService.get();

export const realtorRegistry = RealtorRegistry.get();

export const tenantManagement = TenantSpaceService.get(realtorRegistry);
