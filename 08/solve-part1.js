import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const lines = getDataLines(day);

let answer = 0;
for (let line of lines) {
  let real = line.slice(1, -1);
  real = real.replace(/\\x([0-9a-f]{2})/g, 'x').replace(/\\./g, 'x');
  console.log(line, real, line.length, real.length);
  answer += line.length - real.length;
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
