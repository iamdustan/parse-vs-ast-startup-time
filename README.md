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
> node run.js --parse-prod && node run.js --require-js-prod && node run.js --require-json-prod && node run.js --read-json-prod

parse .js code, prod
Mean:    75 ms
Std Dev: 17 ms

require .js AST, prod
Mean:    184 ms
Std Dev: 227 ms

require .json AST, prod
Mean:    252 ms
Std Dev: 40 ms

read .json AST, prod
Mean:    234 ms
Std Dev: 18 ms

➜  babylon-experiment npm run benchmark-dev

> babylon-experiment@1.0.0 benchmark-dev /Users/sashaaickin/code/parse-vs-ast-startup-time
> node run.js --parse-dev && node run.js --require-js-dev && node run.js --require-json-dev && node run.js --read-json-dev

parse .js code, dev
Mean:    72 ms
Std Dev: 16 ms

require .js AST, dev
Mean:    382 ms
Std Dev: 403 ms

require .json AST, dev
Mean:    925 ms
Std Dev: 418 ms

read .json AST, dev
Mean:    625 ms
Std Dev: 63 ms
```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
