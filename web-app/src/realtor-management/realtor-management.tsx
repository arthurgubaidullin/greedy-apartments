import * as OfferService from '@ga/service-in-realtor-management';
import * as RemoteOfferService from '@ga/service-in-remote-offer-register';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { flow, identity, pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { observer } from 'mobx-react-lite';

const offerService = OfferService.get();

const remoteOfferService = RemoteOfferService.get();

const ChangeRemoteOfferService = observer(() => {
  return (
    <div>
      <h2>Change remote offer service</h2>

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
            E.map((a) => remoteOfferService.changeService(a.serviceId)),
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
    </div>
  );
});

const NewOfferForm = observer(() => {
  return (
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
            E.map((a) => offerService.createOffer(a)),
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
  );
});

const OfferList = observer(() => {
  return pipe(
    offerService.offerList.get(),
    O.fold(
      () => <p>No offers!</p>,
      flow(
        RNEA.map((offer) => (
          <li key={String(offer.id)}>
            {offer.name}
            <button
              onClick={(e) => {
                e.preventDefault();

                remoteOfferService.publishOffer(offer);
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
  );
});

const PublishedOfferList = observer(() => {
  return pipe(
    remoteOfferService.offerList.get(),
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
  );
});

export const RealtorManagement = observer(() => {
  return (
    <div>
      <h1>Realtor Management</h1>

      <NewOfferForm />

      <OfferList />

      <ChangeRemoteOfferService />

      <PublishedOfferList />
    </div>
  );
});

export default RealtorManagement;
