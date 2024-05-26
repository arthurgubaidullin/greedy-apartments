import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { flow, identity, pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { observer } from 'mobx-react-lite';
import * as P from '../program/program';

const ChangeRemoteOfferService = observer(() => {
  const connectToServiceForm = (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        pipe(
          E.Do,
          E.bindW('serviceId', () =>
            pipe(
              formData.get('service-id'),
              E.fromPredicate(
                NonEmptyString.is,
                () => new Error('Invalid remote service id.')
              )
            )
          ),
          E.map((a) => P.realtorSpace.connectToService(a.serviceId)),
          E.fold((e) => {
            console.error(e);
          }, identity)
        );

        e.currentTarget.reset();
      }}
    >
      <label>
        Service ID:
        <input type="text" name="service-id" required />
      </label>
      <br />

      <input type="submit" />
    </form>
  );

  return (
    <div>
      <h2>Connect to service</h2>

      {pipe(
        P.realtorSpace.currentServiceId.get(),
        O.fold(
          () => connectToServiceForm,
          (id) => <div>The service (id={id}) is connected.</div>
        )
      )}
    </div>
  );
});

const NewOfferForm = observer(() => (
  <div>
    <h2>New Offer form</h2>

    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        pipe(
          E.Do,
          E.bind('id', () =>
            pipe(
              crypto.randomUUID(),
              E.fromPredicate(
                NonEmptyString.is,
                () => new Error('Invalid offer id.')
              )
            )
          ),
          E.bindW('name', () =>
            pipe(
              formData.get('name'),
              E.fromPredicate(
                NonEmptyString.is,
                () => new Error('Invalid realtor name.')
              )
            )
          ),
          E.map((a) => P.realtorSpace.createOffer(a)),
          E.fold((e) => {
            console.error(e);
          }, identity)
        );

        e.currentTarget.reset();
      }}
    >
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <br />

      <input type="submit" />
    </form>
  </div>
));

const OfferList = observer(() =>
  pipe(
    P.realtorSpace.offerList.get(),
    O.fold(
      () => <p>No offers!</p>,
      flow(
        RNEA.map((offer) => (
          <li key={String(offer.id)}>
            {offer.name}
            <button
              onClick={(e) => {
                e.preventDefault();

                offer.publish();
              }}
            >
              Publish
            </button>
          </li>
        )),
        (list) => <ul>{list}</ul>
      )
    ),
    (list) => (
      <div>
        <h2>Offer list</h2>

        {list}
      </div>
    )
  )
);

const PublishedOfferList = observer(() =>
  pipe(
    P.realtorSpace.publishedOfferList.get(),
    O.fold(
      () => <p>No offers!</p>,
      flow(
        RNEA.map((offer) => <li key={String(offer.id)}>{offer.name}</li>),
        (list) => <ul>{list}</ul>
      )
    ),
    (list) => (
      <div>
        <h2>Published offer list</h2>

        {list}
      </div>
    )
  )
);

export const RealtorManagement = observer(() => (
  <div>
    <h1>Realtor Management</h1>

    <NewOfferForm />

    <OfferList />

    <ChangeRemoteOfferService />

    <PublishedOfferList />
  </div>
));

export default RealtorManagement;
