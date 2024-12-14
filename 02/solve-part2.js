import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const lines = getDataLines(day).map((l) => l.split('x').map(Number));

let answer = 0;
for (const line of lines) {
  const [one, two, three] = line.sort((a, b) => a - b);
  answer += 2 * one + 2 * two + one * two * three;
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
