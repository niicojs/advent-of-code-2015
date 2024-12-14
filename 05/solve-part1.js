import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const voyelles = ['a', 'e', 'i', 'o', 'u'];

const lines = getDataLines(day);

function check(line) {
  let v = 0;
  let pairs = 0;
  for (let i = 0; i < line.length; i++) {
    if (voyelles.includes(line[i])) v++;
    if (i > 0 && line[i] === line[i - 1]) pairs++;
  }
  for (const nope of ['ab', 'cd', 'pq', 'xy']) {
    if (line.includes(nope)) return false;
  }
  return v >= 3 && pairs >= 1;
}

let answer = 0;
for (const line of lines) {
  if (check(line)) answer++;
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
