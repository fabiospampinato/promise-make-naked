
/* IMPORT */

import {describe} from 'fava';
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

});
