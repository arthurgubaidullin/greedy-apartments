import * as Realtor from '@ga/realtor-in-registry';
import { TypeOf } from 'io-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface T extends TypeOf<typeof codec> {}

export const codec = Realtor.codec;
