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
> node run.js --parse-prod && node run.js --require-js-prod && node run.js --require-json-prod && node run.js --read-json-prod && node run.js --read-json-fast-prod

parse .js code, prod
Mean:    72 ms
Std Dev: 14 ms

require .js AST, prod
Mean:    181 ms
Std Dev: 221 ms

require .json AST, prod
Mean:    282 ms
Std Dev: 49 ms

read .json AST, prod
Mean:    238 ms
Std Dev: 20 ms

read .json AST fast parse, prod
Mean:    235 ms
Std Dev: 19 ms

➜  babylon-experiment npm run benchmark-dev

> babylon-experiment@1.0.0 benchmark-dev /Users/sashaaickin/code/parse-vs-ast-startup-time
> node run.js --parse-dev && node run.js --require-js-dev && node run.js --require-json-dev && node run.js --read-json-dev && node run.js --read-json-fast-dev

parse .js code, dev
Mean:    73 ms
Std Dev: 15 ms

require .js AST, dev
Mean:    372 ms
Std Dev: 391 ms

require .json AST, dev
Mean:    910 ms
Std Dev: 402 ms

read .json AST, dev
Mean:    636 ms
Std Dev: 76 ms

read .json AST fast parse, dev
Mean:    623 ms
Std Dev: 66 ms
```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
