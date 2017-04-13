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
> node run.js --parse-prod && node run.js --require-ast-prod && node run.js --require-js-prod && node run.js --require-json-prod && node run.js --read-json-prod && node run.js --read-json-fast-prod

parse JS code, prod
Mean:    73 ms
Std Dev: 11 ms

require .ast file, prod
Mean:    176 ms
Std Dev: 223 ms

require .js file, prod
Mean:    168 ms
Std Dev: 204 ms

require .json file, prod
Mean:    272 ms
Std Dev: 63 ms

read .json file, prod
Mean:    238 ms
Std Dev: 17 ms

read .json file fast parse, prod
Mean:    249 ms
Std Dev: 32 ms

➜  babylon-experiment npm run benchmark-dev

> babylon-experiment@1.0.0 benchmark-dev /Users/sashaaickin/code/parse-vs-ast-startup-time
> node run.js --parse-dev && node run.js --require-ast-dev && node run.js --require-js-dev && node run.js --require-json-dev && node run.js --read-json-dev && node run.js --read-json-fast-dev

parse JS code, dev
Mean:    74 ms
Std Dev: 13 ms

require .ast file, dev
Mean:    390 ms
Std Dev: 415 ms

require .js file, dev
Mean:    405 ms
Std Dev: 405 ms

require .json file, dev
Mean:    708 ms
Std Dev: 73 ms

read .json file, dev
Mean:    631 ms
Std Dev: 58 ms

read .json file fast parse, dev
Mean:    615 ms
Std Dev: 62 ms

```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
