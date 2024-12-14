import { consola } from 'consola';
import {
  count,
  formatElapsedTime,
  getCurrentDay,
  getRawData,
} from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const line = getRawData(day);
const answer = count(line, '(') - count(line, ')');

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
