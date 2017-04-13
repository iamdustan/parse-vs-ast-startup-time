const babylon = require('babylon');
const benchmark = require('benchmark');
const fs = require('fs');
const path  = require('path');

const pathFor = mode => path.join(
  __dirname,
  'node_modules',
  'react-dom',
  'cjs',
  'react-dom.' + mode + '.js'
);

// set up AST files.
const ReactDOMProd = pathFor('production.min');
const ReactDOMDev = pathFor('development');

const prod = fs.readFileSync(ReactDOMProd, 'utf8');
const prodAst = babylon.parse(prod);
fs.writeFileSync('react-dom.production.min.js', 'module.exports = ' + JSON.stringify(prodAst) + ';');
fs.writeFileSync('react-dom.production.min-json.json', JSON.stringify(prodAst));

const dev = fs.readFileSync(ReactDOMDev, 'utf8');
const devAst = babylon.parse(dev);
fs.writeFileSync('react-dom.development.js', 'module.exports = ' + JSON.stringify(devAst) + ';');
fs.writeFileSync('react-dom.development-json.json', JSON.stringify(devAst));


const benchmarkFns = {
  "parse-prod": {
    name: "parse .js code, prod",
    fn: () => {
      const prod = fs.readFileSync(ReactDOMProd, 'utf8');
      const prodAst = babylon.parse(prod);
    }
  },
  "require-js-prod": {
    name: "require .js AST, prod",
    fn: () => {
      const ast = require('./react-dom.production.min.js');
      delete require.cache[require.resolve('./react-dom.production.min.js')];
    }
  },
  "require-json-prod": {
    name: "require .json AST, prod",
    fn: () => {
      const ast = require('./react-dom.production.min-json');
      delete require.cache[require.resolve('./react-dom.production.min-json')];
    }
  },
  "read-json-prod": {
    name: "read .json AST, prod",
    fn: () => {
      const ast = JSON.parse(fs.readFileSync('./react-dom.production.min-json.json'));
    }
  },
  "parse-dev": {
    name: "parse .js code, dev",
    fn: () => {
      const dev = fs.readFileSync(ReactDOMDev, 'utf8');
      const devAst = babylon.parse(prod);
    }
  },
  "require-js-dev": {
    name: "require .js AST, dev",
    fn: () => {
      const ast = require('./react-dom.development.js');
      delete require.cache[require.resolve('./react-dom.development.js')];
    }
  },
  "require-json-dev": {
    name: "require .json AST, dev",
    fn: () => {
      const ast = require('./react-dom.development-json');
      delete require.cache[require.resolve('./react-dom.development-json')];
    }
  },
  "read-json-dev": {
    name: "read .json AST, dev",
    fn: () => {
      const ast = JSON.parse(fs.readFileSync('./react-dom.development-json.json'));
    }
  },
}

const testArg = process.argv[2];
const testName = testArg.startsWith('--') ? testArg.substr(2) : testArg;

const suite = new benchmark.Suite();

suite
  .add(benchmarkFns[testName])
  .on("complete", function () {
    for (let index = 0; index < this.length; index++) {
      const benchmark = this[index];
      console.log(benchmark.name);
      console.log(`Mean:    ${Math.round(benchmark.stats.mean * 1000)} ms`);
      console.log(`Std Dev: ${Math.round(benchmark.stats.deviation * 1000)} ms`);
      console.log("");
    }
  })
  .run();
