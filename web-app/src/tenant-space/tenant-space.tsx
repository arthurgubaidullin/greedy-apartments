import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { observer } from 'mobx-react-lite';
import * as P from '../program/program';

export const RealtorList = observer(() => {
  const list = pipe(
    P.tenantManagement.realtorList.get(),
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
});

export const OfferList = observer(() => {
  const list = pipe(
    P.tenantManagement.offerList.get(),
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
});

export const TenantSpace = observer(() => {
  return (
    <div>
      <h1>Tenant Management</h1>

      <RealtorList />

      <OfferList />
    </div>
  );
});

export default TenantSpace;
