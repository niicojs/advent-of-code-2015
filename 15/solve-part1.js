import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getCurrentDay, getDataLines, nums, sum, timer } from '../utils.js';

consola.wrapAll();
const max = Math.max;

const day = getCurrentDay();
consola.start('Starting day ' + day);
const t = timer();

const ingredients = [];
const lines = getDataLines(day);
for (const line of lines) {
  const [_, name, cap, d, f, t, cal] = line.match(
    /(\w+)\: .+ (-?\d+), .+ (-?\d+), .+ (-?\d+), .+ (-?\d+), .+ (-?\d+)/
  );
  ingredients.push([name, +cap, +d, +f, +t, +cal]);
}

function* generate(size) {
  if (size === 0) {
    yield [];
  } else {
    for (let i = 0; i <= 100; i++) {
      const iter = generate(size - 1);
      let next;
      while (!(next = iter.next()).done) {
        yield [i, ...next.value];
      }
    }
  }
}

function properties(combo) {
  const cap = combo.reduce((a, b, i) => a + b * ingredients[i][1], 0);
  const d = combo.reduce((a, b, i) => a + b * ingredients[i][2], 0);
  const f = combo.reduce((a, b, i) => a + b * ingredients[i][3], 0);
  const t = combo.reduce((a, b, i) => a + b * ingredients[i][4], 0);
  return max(0, cap) * max(0, d) * max(0, f) * max(0, t);
}

let best = -Infinity;
for (const combo of generate(ingredients.length)) {
  if (sum(combo) !== 100) continue;
  const p = properties(combo);
  if (p > best) best = p;
}
let answer = best;

consola.success('result', answer);
consola.success('Done in', t.format());
if (process.argv[2] === 'real') {
  // await submit({ day, level: 1, answer: answer });
}
clipboard.writeSync(answer?.toString());
