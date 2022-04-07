
/* IMPORT */

import {NOOP} from './constants';
import type {PromiseResolve, PromiseReject, Result} from './types';

/* MAIN */

const makeNakedPromise = <T> (): Result<T> => {

  let resolve: PromiseResolve<T> = NOOP;
  let reject: PromiseReject = NOOP;

  const promise = new Promise<T> ( ( res, rej ): void => {
    resolve = res;
    reject = rej;
  });

  return {promise, resolve, reject};

};

/* EXPORT */

export default makeNakedPromise;
