import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines, memoize } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const graph = {};
const lines = getDataLines(day);
for (const line of lines) {
  const [input, output] = line.split(' -> ');
  if (input.includes(' AND ')) {
    graph[output] = ['and', input.split(' AND ')];
  } else if (input.includes(' OR ')) {
    graph[output] = ['or', input.split(' OR ')];
  } else if (input.startsWith('NOT ')) {
    graph[output] = ['not', input.slice(4)];
  } else if (input.includes(' LSHIFT ')) {
    graph[output] = ['lshift', input.split(' LSHIFT ')];
  } else if (input.includes(' RSHIFT ')) {
    graph[output] = ['rshift', input.split(' RSHIFT ')];
  } else if (input.match(/^\d+$/)) {
    graph[output] = ['val', +input];
  } else {
    graph[output] = ['var', input];
  }
}

graph['b'] = ['val', 16076];

const find = memoize((want) => {
  consola.log(want, graph[want]);
  if (Number.isInteger(+want)) return want;

  const [type, val] = graph[want];
  if (type === 'val') {
    return +val;
  } else if (type === 'var') {
    return find(val);
  } else if (type === 'and') {
    return find(val[0]) & find(val[1]);
  } else if (type === 'or') {
    return find(val[0]) | find(val[1]);
  } else if (type === 'not') {
    return find(val) ^ 65535;
  } else if (type === 'lshift') {
    return find(val[0]) << +val[1];
  } else if (type === 'rshift') {
    return find(val[0]) >> +val[1];
  }
});

let answer = find('a');

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
