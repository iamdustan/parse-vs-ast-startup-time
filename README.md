Experiment in string vs ast. Parsing a string into an AST or require()-ing the
AST, what’s faster?

To run:

* `git clone {repo}`
* `node run.js`

```sh
➜  babylon-experiment node run.js
parse prod: 189.546ms
parse dev: 198.160ms
stringify and write prod: 227.476ms
stringify and write dev: 422.986ms
require prod ast: 1331.428ms
require dev ast: 2209.453ms
```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
