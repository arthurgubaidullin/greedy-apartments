import { createTopic } from '@ga/pub-sub';
import { RealtorChanged } from './realtor-changed';

export const topic = createTopic('realtor-changes-in-registry', RealtorChanged);
