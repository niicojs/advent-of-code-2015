import { consola } from 'consola';
import clipboard from 'clipboardy';
import { md5 } from 'js-md5';
import { formatElapsedTime, getCurrentDay, getRawData } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const key = getRawData(day).trim();
let i = 0;
while (true) {
  const h = md5(key + i);
  if (h.startsWith('00000')) break;
  i++;
}

let answer = i;

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer.toString());
