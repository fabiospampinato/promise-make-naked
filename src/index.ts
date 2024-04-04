
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

    resolve = value => {
      resolved = true;
      return res ( value );
    };

    reject = value => {
      rejected = true;
      return rej ( value );
    };

  });

  const isPending = (): boolean => !resolved && !rejected;
  const isResolved = (): boolean => resolved;
  const isRejected = (): boolean => rejected;

  return {promise, resolve, reject, isPending, isResolved, isRejected};

};

/* UTILITIES */

makeNakedPromise.wrap = async <T> ( fn: ( result: Result<T> ) => void ): Promise<T> => {

  const result = makeNakedPromise<T> ();

  await fn ( result );

  return result.promise;

};

/* EXPORT */

export default makeNakedPromise;
export type {Result};
