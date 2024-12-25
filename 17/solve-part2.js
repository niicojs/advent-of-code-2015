import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getCurrentDay, getDataLines, timer } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();
consola.start('Starting day ' + day);
const t = timer();

const TOTAL = process.argv[2] === 'real' ? 150 : 25;
const values = getDataLines().map(Number);

const fill = (value, possible) => {
  if (value === 0) return [[]];
  if (possible.length === 0) return value === 0 ? [[]] : null;
  let ways = [];
  for (let i = 0; i < possible.length; i++) {
    if (possible[i] <= value) {
      const w = fill(value - possible[i], possible.slice(i + 1));
      if (w !== null) {
        ways.push(...w.map((x) => [possible[i], ...x]));
      }
    }
  }
  return ways;
};

const ways = fill(TOTAL, values);
const min = Math.min(...ways.map((x) => x.length));
const answer = ways.filter((x) => x.length === min).length;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());
