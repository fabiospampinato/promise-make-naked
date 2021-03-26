
/* IMPORT */

import {PromiseResolve, PromiseReject, Result} from './types';
import {NOOP} from './consts';

/* PROMISE MAKE NAKED */

const makeNakedPromise = <T> (): Result<T> => {

  let resolve: PromiseResolve<T> = NOOP,
      reject: PromiseReject = NOOP;

  const promise = new Promise<T> ( ( res, rej ): void => {
    resolve = res;
    reject = rej;
  });

  return {promise, resolve, reject};

};

/* EXPORT */

export default makeNakedPromise;
