import { offerDocumentInTenantManagement } from './offer-document';

describe('offerDocumentInTenantManagement', () => {
  it('should work', () => {
    expect(offerDocumentInTenantManagement()).toEqual(
      'offer-document-in-tenant-management'
    );
  });
});
