function memoize(target: Function, context) {
  let cache = new Map();
  if (context.kind === 'method') {

    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    return function(...args: any[]) {
      const argsKey = args.join(",");
      let key = argsKey;
      if (key === '') {
        key = target.name;
      }
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = target.apply(this, args);
      cache.set(key, result);
      return result;
    }
  }

}

export { memoize };