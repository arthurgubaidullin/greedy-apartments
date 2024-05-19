import * as RealtorId from '@ga/realtor-id-in-realtor-registry';
import * as RealtorServiceId from '@ga/realtor-service-id-in-realtor-registry';
import * as fs from 'fast-check';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import * as Realtor from './realtor';

const nonEmptyStringArb = fs.string({ maxLength: 1 }).filter(NonEmptyString.is);

describe('realtor-in-registry', () => {
  it('should create realtor', () => {
    fs.assert(
      fs.property(
        fs.record({
          id: nonEmptyStringArb,
          name: fs.string(),
          serviceId: nonEmptyStringArb,
        }),
        (data) => {
          pipe(
            Realtor.create({
              name: data.name,
              id: RealtorId.fromNonEmptyString(data.id),
              serviceId: RealtorServiceId.fromNonEmptyString(data.serviceId),
            }),
            (a) => {
              expect(a).toEqual(data);
            }
          );
        }
      )
    );
  });
});
