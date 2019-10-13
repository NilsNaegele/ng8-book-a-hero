import { ObjectCounterPipe } from './object-counter.pipe';

describe('ObjectCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
