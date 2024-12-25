import { consola } from 'consola';
import clipboard from 'clipboardy';
import {
  formatElapsedTime,
  getCurrentDay,
  getRawData,
  sum,
} from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const raw = getRawData(day);
const answer = sum(raw.match(/(-?\d+)/g).map(Number));

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
