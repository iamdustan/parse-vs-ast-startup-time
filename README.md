Experiment in string vs ast. Parsing a string into an AST or require()-ing the
AST, what’s faster?

To run:

* `git clone {repo}`
* `node run.js`

```sh
➜  babylon-experiment node run.js
parse prod: 192.497ms
parse dev: 194.586ms
stringify and write prod: 203.352ms
stringify and write dev: 479.854ms
require prod ast: 1343.973ms
require dev ast: 2097.112ms
```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
