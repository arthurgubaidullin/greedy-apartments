import * as fs from 'fast-check';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as RealtorId from './realtor-id';
import { FailedToCreateRealtorId } from './failed-to-create-realtor-id';

const nonEmptyStringArb = () => fs.string({ minLength: 1 });

describe('RealtorId', () => {
  describe('fromString', () => {
    it('should create RealtorId if input is non empty string', () => {
      fs.assert(
        fs.property(nonEmptyStringArb(), (s) => {
          pipe(
            s,
            RealtorId.fromString,
            E.fold(
              (e) => {
                expect(e).toBeFalsy();
              },
              (a) => {
                expect(a).toStrictEqual(s);
              }
            )
          );
        })
      );
    });
    it('should not create RealtorId if input is empty string', () => {
      fs.assert(
        fs.property(fs.constant(''), (s) => {
          pipe(
            s,
            RealtorId.fromString,
            E.fold(
              (e) => {
                expect(e).toBeInstanceOf(FailedToCreateRealtorId);
              },
              (a) => {
                expect(a).toBeFalsy();
              }
            )
          );
        })
      );
    });
  });
});
