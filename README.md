Experiment in string vs ast. Parsing a string into an AST or require()-ing the
AST, what’s faster?

To run:

* `git clone {repo}`
* `npm install`
* `npm run benchmark-prod`
* `npm run benchmark-dev`

```sh
➜  babylon-experiment npm run benchmark-prod

> babylon-experiment@1.0.0 benchmark-prod /Users/sashaaickin/code/parse-vs-ast-startup-time
> node run.js --parse-prod && node run.js --require-ast-prod && node run.js --require-js-prod && node run.js --require-json-prod && node run.js --read-json-prod

parse JS code, prod
Mean:    73 ms
Std Dev: 16 ms

require .ast file, prod
Mean:    183 ms
Std Dev: 234 ms

require .js file, prod
Mean:    187 ms
Std Dev: 233 ms

require .json file, prod
Mean:    280 ms
Std Dev: 61 ms

read .json file, prod
Mean:    256 ms
Std Dev: 38 ms

➜  babylon-experiment npm run benchmark-dev

> babylon-experiment@1.0.0 benchmark-dev /Users/sashaaickin/code/parse-vs-ast-startup-time
> node run.js --parse-dev && node run.js --require-ast-dev && node run.js --require-js-dev && node run.js --require-json-dev && node run.js --read-json-dev

parse JS code, dev
Mean:    78 ms
Std Dev: 16 ms

require .ast file, dev
Mean:    395 ms
Std Dev: 402 ms

require .js file, dev
Mean:    454 ms
Std Dev: 465 ms

require .json file, dev
Mean:    750 ms
Std Dev: 143 ms

read .json file, dev
Mean:    638 ms
Std Dev: 46 ms

```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
