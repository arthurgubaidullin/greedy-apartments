import * as Service from '@ga/service-in-tenant-management';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';

const service = Service.get();

export const RealtorList = () => {
  const list = pipe(
    service.realtorList.get(),
    O.fold(
      () => <p>No realtors.</p>,
      (list) =>
        pipe(
          list,
          RNEA.map((realtor) => <li key={realtor.id}>{realtor.name}</li>),
          (list) => <ul>{list}</ul>
        )
    )
  );

  return (
    <div>
      <h2>Realtor list</h2>

      {list}
    </div>
  );
};

export const OfferList = () => {
  const list = pipe(
    service.offerList.get(),
    O.fold(
      () => <p>No offers.</p>,
      (list) =>
        pipe(
          list,
          RNEA.map((offer) => <li key={offer.id}>{offer.name}</li>),
          (list) => <ul>{list}</ul>
        )
    )
  );

  return (
    <div>
      <h2>Offer list</h2>

      {list}
    </div>
  );
};

export function TenantManagement() {
  return (
    <div>
      <h1>Tenant Management</h1>

      <RealtorList />

      <OfferList />
    </div>
  );
}

export default TenantManagement;
