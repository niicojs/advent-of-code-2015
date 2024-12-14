import { consola } from 'consola';
import {
  formatElapsedTime,
  getCurrentDay,
  getRawData,
} from '../utils.js';
import { submit } from '../aoc.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const line = getRawData(day);

let floor = 0;
let answer = 0;
while (true) {
  const c = line[answer++];
  if (c === '(') floor++;
  else if (c === ')') floor--;
  if (floor === -1) break;
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
