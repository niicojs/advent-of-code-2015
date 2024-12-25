import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getCurrentDay, getDataLines, timer } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();
consola.start('Starting day ' + day);
const t = timer();

const clues = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const lines = getDataLines();

function find() {
  for (const [i, line] of lines.entries()) {
    const aunt = new Map(line.match(/(\w+): (\d+)/g).map((s) => s.split(': ')));

    let ok = true;
    for (const key of Object.keys(clues)) {
      if (aunt.has(key) && +aunt.get(key) !== clues[key]) {
        ok = false;
        break;
      }
    }

    if (ok) return i + 1;
  }
}

let answer = find();

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());
