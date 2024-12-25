import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let time = 2503;

function fly(speed, max, rest) {
  const full = Math.floor(time / (max + rest));
  let dist = full * max * speed;
  const todo = time % (max + rest);
  dist += Math.min(todo, max) * speed;
  return dist;
}

let winner = [0, ''];
const lines = getDataLines(day);
for (const line of lines) {
  const [_, who, speed, max, rest] = line.match(
    /(\w+) .+ (\d+) km.s for (\d+) seconds, .+ for (\d+) s/
  );
  const dist = fly(+speed, +max, +rest);
  if (dist > winner[0]) {
    winner = [dist, who];
  }
}

consola.log(winner);
let answer = winner[0];

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
