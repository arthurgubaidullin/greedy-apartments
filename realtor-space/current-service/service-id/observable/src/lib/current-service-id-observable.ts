import { Eq } from 'fp-ts/Eq';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import { NonEmptyString } from 'io-ts-types';
import { observable } from 'mobx';

export type CurrentServiceIdOption = O.Option<NonEmptyString>;

export const get = () =>
  observable.box<CurrentServiceIdOption>(O.none, {
    equals: O.getEq(S.Eq).equals,
  } satisfies Eq<CurrentServiceIdOption>);
