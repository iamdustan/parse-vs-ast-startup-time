const babylon = require('babylon');
const fs = require('fs');
const path  = require('path');

const pathFor = mode => path.join(
  __dirname,
  'node_modules',
  'react-dom',
  'cjs',
  'react-dom.' + mode + '.js'
);

const ReactDOMProd = pathFor('production.min');
const ReactDOMDev = pathFor('development');

const prod = fs.readFileSync(ReactDOMProd, 'utf8');
const dev = fs.readFileSync(ReactDOMDev, 'utf8');


console.time('parse prod');
const prodAst = babylon.parse(prod);
console.timeEnd('parse prod');

console.time('parse dev');
const devAst = babylon.parse(dev);
console.timeEnd('parse dev');


console.time('stringify and write prod');
fs.writeFileSync('react-dom.production.min.ast', 'module.exports = ' + JSON.stringify(prodAst) + ';');
console.timeEnd('stringify and write prod');

console.time('stringify and write dev');
fs.writeFileSync('react-dom.development.ast', 'module.exports = ' + JSON.stringify(devAst) + ';');
console.timeEnd('stringify and write dev');

console.time('require prod ast');
require('./react-dom.production.min.ast');
console.timeEnd('require prod ast');

console.time('require dev ast');
require('./react-dom.development.ast');
console.timeEnd('require dev ast');
