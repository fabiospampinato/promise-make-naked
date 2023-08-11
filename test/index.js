
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import promiseMakeNaked from '../dist/index.js';

/* MAIN */

describe ( 'promiseMakeNaked', it => {

  it ( 'returns a function which can be resolved from the outside', t => {

    const {promise, resolve} = promiseMakeNaked ();

    promise.then ( t.pass );

    resolve ();

  });

  it ( 'returns a function which can be rejected from the outside', t => {

    const {promise, reject} = promiseMakeNaked ();

    promise.catch ( t.pass );

    reject ();

  });

  it ( 'returns a function which can be used to check if the promise is pending, resolve branch', async t => {

    const {resolve, isPending} = promiseMakeNaked ();

    t.true ( isPending () );

    resolve ();

    await delay ( 50 );

    t.false ( isPending () );

  });

  it ( 'returns a function which can be used to check if the promise is pending, reject branch', async t => {

    const {reject, isPending} = promiseMakeNaked ();

    t.true ( isPending () );

    reject ();

    await delay ( 50 );

    t.false ( isPending () );

  });

  it ( 'returns a function which can be used to check if the promise is resolved, resolve branch', async t => {

    const {resolve, isResolved} = promiseMakeNaked ();

    t.false ( isResolved () );

    resolve ();

    await delay ( 50 );

    t.true ( isResolved () );

  });

  it ( 'returns a function which can be used to check if the promise is resolved, reject branch', async t => {

    const {reject, isResolved} = promiseMakeNaked ();

    t.false ( isResolved () );

    reject ();

    await delay ( 50 );

    t.false ( isResolved () );

  });

  it ( 'returns a function which can be used to check if the promise is rejected, resolve branch', async t => {

    const {resolve, isRejected} = promiseMakeNaked ();

    t.false ( isRejected () );

    resolve ();

    await delay ( 50 );

    t.false ( isRejected () );

  });

  it ( 'returns a function which can be used to check if the promise is rejected, reject branch', async t => {

    const {reject, isRejected} = promiseMakeNaked ();

    t.false ( isRejected () );

    reject ();

    await delay ( 50 );

    t.true ( isRejected () );

  });

});
