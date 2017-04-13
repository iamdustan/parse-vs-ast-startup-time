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

console.time('parse prod');
const prod = fs.readFileSync(ReactDOMProd, 'utf8');
const prodAst = babylon.parse(prod);
console.timeEnd('parse prod');

console.time('parse dev');
const dev = fs.readFileSync(ReactDOMDev, 'utf8');
const devAst = babylon.parse(dev);
console.timeEnd('parse dev');
console.log('');


// console.time('stringify and write prod');
const stringifiedProdAst = JSON.stringify(prodAst)
fs.writeFileSync('react-dom.production.min.ast.js', 'module.exports = ' + stringifiedProdAst  + ';');
fs.writeFileSync('react-dom.production.min.ast', stringifiedProdAst);
// console.timeEnd('stringify and write prod');

// console.time('stringify and write dev');
const stringifiedDevAst = JSON.stringify(devAst) 
fs.writeFileSync('react-dom.development.ast.js', 'module.exports = ' + stringifiedDevAst + ';');
fs.writeFileSync('react-dom.development.ast', stringifiedDevAst);
// console.timeEnd('stringify and write dev');

console.time('require prod ast module');
require('./react-dom.production.min.ast.js');
console.timeEnd('require prod ast module');

console.time('require dev ast module');
require('./react-dom.development.ast.js');
console.timeEnd('require dev ast module');
console.log('');


console.log('read+parse prod ast');
console.time('  total');
console.time('  read ');
const prodAstAsString = fs.readFileSync(__dirname + '/react-dom.production.min.ast', 'utf8');
console.timeEnd('  read ');
console.time('  parse');
const x = JSON.parse(prodAstAsString);
console.timeEnd('  parse');
console.timeEnd('  total');
console.log('');

console.log('read+parse dev ast');
console.time('  total');
console.time('  read ');
const devAstAsString = fs.readFileSync(__dirname + '/react-dom.development.ast', 'utf8');
console.timeEnd('  read ');
console.time('  parse');
const y = JSON.parse(devAstAsString);
console.timeEnd('  parse');
console.timeEnd('  total');

