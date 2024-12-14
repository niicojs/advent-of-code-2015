import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';
import TinyQueue from 'tinyqueue';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let start = '';
const routes = {};
const lines = getDataLines(day);
for (const line of lines) {
  const [path, dist] = line.split(' = ');
  const [from, to] = path.split(' to ');
  if (!start) start = from;
  if (!routes[from]) routes[from] = [];
  if (!routes[to]) routes[to] = [];
  routes[from].push([to, +dist]);
  routes[to].push([from, +dist]);
}

const all = Object.keys(routes).length;
consola.log('all', all);

function travel() {
  const todo = new TinyQueue([], (a, b) => b.d - a.d);
  for (const start of Object.keys(routes)) {
    todo.push({ pos: start, d: 0, visited: new Set([start]) });
  }
  let best = 0;
  while (todo.length > 0) {
    const { pos, d, visited } = todo.pop();
    if (visited.size === all && d > best) {
      best = d;
      continue;
    }
    for (const [next, dist] of routes[pos]) {
      if (visited.has(next)) continue;
      todo.push({
        pos: next,
        d: d + dist,
        visited: new Set([...visited, next]),
      });
    }
  }
  return best;
}

let answer = travel();

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
