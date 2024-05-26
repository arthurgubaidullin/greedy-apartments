import { ReadonlyObservable } from '@ga/readonly-observable';
import * as OfferSpace from '@ga/api-in-offer-space';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { NonEmptyString } from 'io-ts-types';
import { computed } from 'mobx';

export const get = (
  currentServiceId: ReadonlyObservable<O.Option<NonEmptyString>>
) =>
  computed(() =>
    pipe(
      currentServiceId.get(),
      O.map((currentServiceId: NonEmptyString) => {
        const api = OfferSpace.get();
        api.changeService(currentServiceId);
        return {
          publishedOfferList: api.offerList,
          publishOffer: api.publishOffer,
        };
      })
    )
  );
