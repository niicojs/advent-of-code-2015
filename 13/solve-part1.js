import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';
import TinyQueue from 'tinyqueue';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let start = '';
const people = new Set();
const changes = {};
const lines = getDataLines(day);
for (const line of lines) {
  const [_, from, what, nb, to] = line.match(
    /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)./
  );
  if (!start) start = from;
  people.add(from);
  people.add(to);
  changes[`${from}_${to}`] = what === 'gain' ? +nb : -+nb;
}

function place(start) {
  const todo = new TinyQueue([], (a, b) => b.happiness - a.happiness);
  todo.push({
    first: start,
    last: start,
    happiness: 0,
    done: new Set([start]),
  });
  let best = 0;
  while (todo.length > 0) {
    const { first, last, happiness, done } = todo.pop();
    if (done.size === people.size) {
      const h =
        happiness + changes[`${last}_${first}`] + changes[`${first}_${last}`];
      if (h > best) best = h;
      continue;
    }
    for (const person of people) {
      if (done.has(person)) continue;
      todo.push({
        first,
        last: person,
        happiness:
          happiness +
          changes[`${last}_${person}`] +
          changes[`${person}_${last}`],
        done: new Set([...done, person]),
      });
    }
  }
  return best;
}

let answer = place(start);

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
