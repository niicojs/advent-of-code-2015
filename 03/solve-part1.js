import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getRawData } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const path = getRawData(day);

const key = (x, y) => `${x},${y}`;
let [x, y] = [0, 0];
const visited = new Set([key(x, y)]);

for (const c of path) {
  if (c === '^') y -= 1;
  else if (c === 'v') y += 1;
  else if (c === '>') x += 1;
  else if (c === '<') x -= 1;

  visited.add(key(x, y));
}

let answer = visited.size;

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
