import { registerRealtorApi } from '@ga/register-realtor-api-in-registry';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';

export function RealtorRegisterForm() {
  return (
    <div>
      <h2>Realtor register form</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          return pipe(
            E.Do,
            E.bind('id', () =>
              pipe(
                formData.get('id'),
                E.fromPredicate(
                  NonEmptyString.is,
                  () => new Error('Invalid realtor ID.')
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
            E.bindW('serviceId', () =>
              pipe(
                formData.get('service-id'),
                E.fromPredicate(
                  NonEmptyString.is,
                  () => new Error('Invalid realtor service ID.')
                )
              )
            ),
            E.map(registerRealtorApi),
            E.fold(
              (e) => {
                console.error(e);
              },
              () => {
                console.log('Ok.');
              }
            )
          );
        }}
      >
        <label>
          ID:
          <input type="text" name="id" defaultValue={'test'} required />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" defaultValue={'test'} required />
        </label>
        <label>
          Service ID:
          <input type="text" name="service-id" defaultValue={'test'} required />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
