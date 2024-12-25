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
  if (value === 0) return 1;
  if (possible.length === 0) return value === 0 ? 1 : 0;
  let nb = 0;
  for (let i = 0; i < possible.length; i++) {
    if (possible[i] <= value) {
      nb += fill(value - possible[i], possible.slice(i + 1));
    }
  }
  return nb;
};

const answer = fill(TOTAL, values);

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());
