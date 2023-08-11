
/* IMPORT */

import {NOOP} from './constants';
import type {PromiseResolve, PromiseReject, Result} from './types';

/* MAIN */

const makeNakedPromise = <T> (): Result<T> => {

  let resolve: PromiseResolve<T> = NOOP;
  let reject: PromiseReject = NOOP;

  let resolved = false;
  let rejected = false;

  const promise = new Promise<T> ( ( res, rej ): void => {
    resolve = res;
    reject = rej;
  });

  promise.then ( () => resolved = true, () => rejected = true );

  const isPending = (): boolean => !resolved && !rejected;
  const isResolved = (): boolean => resolved;
  const isRejected = (): boolean => rejected;

  return {promise, resolve, reject, isPending, isResolved, isRejected};

};

/* EXPORT */

export default makeNakedPromise;
