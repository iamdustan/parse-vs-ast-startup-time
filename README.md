Experiment in string vs ast. Parsing a string into an AST or require()-ing the
AST, what’s faster?

To run:

* `git clone {repo}`
* `node run.js`

```sh
➜  babylon-experiment node run.js
parse prod: 211.803ms
parse dev: 213.261ms

require prod ast module: 1359.452ms
require dev ast module: 2152.315ms

read+parse prod ast
  read : 19.035ms
  parse: 296.376ms
  total: 315.619ms

read+parse dev ast
  read : 98.348ms
  parse: 791.297ms
  total: 889.840ms

```

Random observation: `JSON.stringify(ast, null, 2)` takes ~5x longer than
`JSON.stringify(ast)`.
