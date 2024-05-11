import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';

const publish =
  (topic: Comment, eventType: string) =>
  <C extends t.Mixed>(eventCodec: C) =>
  (data: t.TypeOf<C>) => {
    topic.dispatchEvent(
      new CustomEvent(eventType, {
        detail: eventCodec.encode(data),
      })
    );
  };

const subscribe =
  (topic: Comment, eventType: string) =>
  <C extends t.Mixed>(eventCodec: C) =>
  (onEventReceived: (data: t.TypeOf<C>) => void): (() => void) => {
    const f = (event: Event): void => {
      if (event instanceof CustomEvent) {
        return pipe(
          event.detail,
          eventCodec.decode,
          E.mapLeft(failure),
          E.fold((e) => {
            console.log(e);
          }, onEventReceived)
        );
      }
    };

    topic.addEventListener(eventType, f);

    return () => topic.removeEventListener(eventType, f);
  };

export const createTopic = <C extends t.Mixed>(name: string, eventCodec: C) => {
  const topic = new Comment(name);

  const eventType = crypto.randomUUID();

  return {
    publish: publish(topic, eventType)(eventCodec),
    subscribe: subscribe(topic, eventType)(eventCodec),
  };
};
