import { memoize, cache } from '../../../src/decorators/memoize/memoize';

class TestClass {

  @memoize
  testMethod(testParam: number) {
    const fib = [0, 1]; // Initialize array!
    for (let i = 2; i <= testParam; i++) {
      fib[i] = fib[i - 2] + fib[i - 1];
    }
    return fib[testParam];
  }
}

describe('memoize', () => {

  it('should place an entry in the cache, based on the wrapped functions parameter', () => {
    const test = new TestClass();
    let res = test.testMethod(20);
    const key = cache.get('20');
    expect(key).toEqual(res);
  });

})