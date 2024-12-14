import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const lines = getDataLines(day).map((l) => l.split('x').map(Number));

let answer = 0;
for (const [l, w, h] of lines) {
  answer += 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l);
}

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
