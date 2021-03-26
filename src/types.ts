
/* TYPES */

type PromiseResolve <T> = ( value: T | PromiseLike<T> ) => void;

type PromiseReject = ( reason?: any ) => void;

type Result <T> = {
  promise: Promise<T>,
  resolve: PromiseResolve<T>,
  reject: PromiseReject
};

/* EXPORT */

export {PromiseResolve, PromiseReject, Result};
