
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import makeNakedPromise from '../dist/index.js';

/* MAIN */

describe ( 'makeNakedPromise', it => {

  it ( 'returns a function which can be resolved from the outside', t => {

    const {promise, resolve} = makeNakedPromise ();

    promise.then ( t.pass );

    resolve ();

  });

  it ( 'returns a function which can be rejected from the outside', t => {

    const {promise, reject} = makeNakedPromise ();

    promise.catch ( t.pass );

    reject ();

  });

  it ( 'returns a function which can be used to check if the promise is pending, resolve branch', t => {

    const {resolve, isPending} = makeNakedPromise ();

    t.true ( isPending () );

    resolve ();

    t.false ( isPending () );

  });

  it ( 'returns a function which can be used to check if the promise is pending, reject branch', t => {

    const {promise, reject, isPending} = makeNakedPromise ();

    promise.catch ( () => {} );

    t.true ( isPending () );

    reject ();

    t.false ( isPending () );

  });

  it ( 'returns a function which can be used to check if the promise is resolved, resolve branch', t => {

    const {resolve, isResolved} = makeNakedPromise ();

    t.false ( isResolved () );

    resolve ();

    t.true ( isResolved () );

  });

  it ( 'returns a function which can be used to check if the promise is resolved, reject branch', t => {

    const {promise, reject, isResolved} = makeNakedPromise ();

    promise.catch ( () => {} );

    t.false ( isResolved () );

    reject ();

    t.false ( isResolved () );

  });

  it ( 'returns a function which can be used to check if the promise is rejected, resolve branch', t => {

    const {resolve, isRejected} = makeNakedPromise ();

    t.false ( isRejected () );

    resolve ();

    t.false ( isRejected () );

  });

  it ( 'returns a function which can be used to check if the promise is rejected, reject branch', t => {

    const {promise, reject, isRejected} = makeNakedPromise ();

    promise.catch ( () => {} );

    t.false ( isRejected () );

    reject ();

    t.true ( isRejected () );

  });

  it ( 'supports wrapping an arbitrary function', async t => {

    const promise = makeNakedPromise.wrap ( async result => {

      t.true ( result.promise instanceof Promise );
      t.true ( typeof result.resolve === 'function' );
      t.true ( typeof result.reject === 'function' );
      t.true ( typeof result.isPending === 'function' );
      t.true ( typeof result.isResolved === 'function' );
      t.true ( typeof result.isRejected === 'function' );

      await delay ( 50 );

      result.resolve ( 123 );

    });

    t.is ( await promise, 123 );

  });

});
