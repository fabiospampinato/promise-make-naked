# Promise Make Naked

A simple function that makes a promise that can be resolved or rejected from the outside.

## Install

```sh
npm install --save promise-make-naked
```

## Usage

```ts
import makeNakedPromise from 'promise-make-naked';

const {promise, resolve, reject} = makeNakedPromise ();

resolve ( 123 ); // Resolve the promise with the provided value
reject ( new Error () ); // Reject the promise with the provided reason
```

## License

MIT © Fabio Spampinato
