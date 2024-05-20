import { RealtorStruct } from '@ga/realtor-struct-in-tenant-management';
import { updateRealtor } from '@ga/update-realtor-api-in-tenant-management';
import * as O from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
import { IObservableValue, autorun } from 'mobx';

export const subscribeToRealtorRegisterApi = (
  realtorAddedToRegistry: Pick<IObservableValue<O.Option<RealtorStruct>>, 'get'>
) =>
  autorun(() =>
    pipe(realtorAddedToRegistry.get(), O.fold(constVoid, updateRealtor))
  );
