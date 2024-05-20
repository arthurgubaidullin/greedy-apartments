import * as RealtorManagementService from '@ga/service-in-realtor-management';
import * as RemoteOfferService from '@ga/service-in-remote-offer-register';
import * as TenantManagementService from '@ga/service-in-tenant-management';
import * as RealtorRegistry from '@ga/service-in-realtor-registry';

export const realtorManagement = RealtorManagementService.get();

export const remoteOffers = RemoteOfferService.get();

export const realtorRegistry = RealtorRegistry.get();

export const tenantManagement = TenantManagementService.get(realtorRegistry);
