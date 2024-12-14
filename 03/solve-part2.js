import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getRawData } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const path = getRawData(day);

const key = ([x, y]) => `${x},${y}`;
let santa = [0, 0];
let robot = [0, 0];
const visited = new Set([key(santa)]);

let turn = 0;
for (const c of path) {
  let pos = santa;
  if (turn % 2 === 1) pos = robot;
  if (c === '^') pos[1] -= 1;
  else if (c === 'v') pos[1] += 1;
  else if (c === '>') pos[0] += 1;
  else if (c === '<') pos[0] -= 1;

  turn++;
  visited.add(key(pos));
}

let answer = visited.size;

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
