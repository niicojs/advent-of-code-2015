import { consola } from 'consola';
import clipboard from 'clipboardy';
import {
  formatElapsedTime,
  getCurrentDay,
  getDataLines,
} from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const lines = getDataLines(day);

function check(line) {
  let repeat = 0;
  let pairs = 0;
  for (let i = 0; i < line.length; i++) {
    if (i > 1 && line[i] === line[i - 2]) repeat++;
    if (i > 0 && line.slice(i + 1).includes(line.slice(i - 1, i + 1))) pairs++;
  }
  return repeat > 0 && pairs > 0;
}

let answer = 0;
for (const line of lines) {
  if (check(line)) {
    answer++;
    consola.log(line);
  }
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
