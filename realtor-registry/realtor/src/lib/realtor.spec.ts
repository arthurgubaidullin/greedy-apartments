import { pipe } from 'fp-ts/lib/function';
import * as Realtor from './realtor';
import * as RealtorId from '@ga/realtor-id';
import * as E from 'fp-ts/Either';

describe('realtor-in-registry', () => {
  it('should create realtor', () => {
    const id = 'test';
    const name = 'test';
    pipe(
      RealtorId.fromString(id),
      E.map((id) => Realtor.create({ id, name })),
      E.fold(
        (e) => {
          expect(e).toBeFalsy();
        },
        (a) => {
          expect(a).toEqual({ id, name });
        }
      )
    );
  });
});
