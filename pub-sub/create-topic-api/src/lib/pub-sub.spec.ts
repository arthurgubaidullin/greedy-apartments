import { pubSub } from './pub-sub';

describe('pubSub', () => {
  it('should work', () => {
    expect(pubSub()).toEqual('pub-sub');
  });
});
