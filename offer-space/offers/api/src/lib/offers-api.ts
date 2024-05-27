import * as OfferAdded from '@ga/offer-added-store-in-offer-space';
import * as OfferDocument from '@ga/offer-document-in-offer-space';
import * as OfferStruct from '@ga/offer-struct-in-offer-space';
import { ReadonlyObservable } from '@ga/readonly-observable';
import { ServiceId } from '@ga/service-id-in-offer-space';
import * as O from 'fp-ts/Option';
import * as RA from 'fp-ts/ReadonlyArray';
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';
import { getOfferListApi as getOfferList } from './get-offer-list';
import { getOfferListStore } from './get-offer-list-store';
import { publishOfferApi as publishOffer } from './publish-offer';
import * as OfferList from '@ga/offer-list-store-in-offer-space';
import { simplifyOfferStructListStore } from './simplify-offer-struct-list-store';

interface PublishOffer {
  readonly publishOffer: (
    data: OfferDocument.OfferDocumentSimplifed
  ) => O.Option<OfferDocument.OfferDocument>;
}

interface OfferListObservable {
  readonly offerList: ReadonlyObservable<
    O.Option<RNEA.ReadonlyNonEmptyArray<OfferStruct.OfferStructSimplified>>
  >;
}

type Service = PublishOffer & OfferListObservable;

const _get = (serviceId: ServiceId) => {
  const offerAdded = OfferAdded.get();

  const _publishOffer = publishOffer(offerAdded)(serviceId);

  const offerList = getOfferListStore({ getOfferList, offerAdded })(serviceId);

  return {
    publishOffer: _publishOffer,
    offerList,
  };
};

export const get = (serviceId: ServiceId): Service => {
  const api = _get(serviceId);

  return {
    publishOffer: api.publishOffer,
    offerList: simplifyOfferStructListStore(api.offerList),
  };
};

export const getList = (serviceIds: ReadonlyArray<ServiceId>) =>
  pipe(
    serviceIds,
    RA.map(_get),
    RA.map((a) => a.offerList),
    OfferList.merge,
    simplifyOfferStructListStore
  );
