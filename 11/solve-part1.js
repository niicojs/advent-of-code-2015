import { consola } from 'consola';
import clipboard from 'clipboardy';
import {
  formatElapsedTime,
  getCurrentDay,
  getDataLines,
  getRawData,
} from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let password = getRawData(day);

function nextchar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function check(str) {
  let check1 = false;
  let pairs = 0;
  let lastpairs = -1;
  for (let i = 0; i < str.length; i++) {
    if (i > 2) {
      if (
        str[i] === nextchar(str[i - 1]) &&
        str[i - 1] === nextchar(str[i - 2])
      )
        check1 = true;
    }
    if (['i', 'o', 'l'].includes(str[i])) return false;
    if (i > 0 && str[i] === str[i - 1]) {
      if (i > lastpairs + 1) {
        pairs++;
      }
      lastpairs = i;
    }
  }
  return check1 && pairs >= 2;
}

function next(str) {
  if (!str) return 'a';
  if (str.at(-1) === 'z') return next(str.slice(0, -1)) + 'a';
  return str.slice(0, -1) + String.fromCharCode(str.at(-1).charCodeAt(0) + 1);
}

do {
  password = next(password);
} while (!check(password));

consola.success('part 1', password);

do {
  password = next(password);
} while (!check(password));

let answer = password;

consola.success('part 2', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
