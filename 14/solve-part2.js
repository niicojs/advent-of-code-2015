import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let time = 2503;
const DIST = 4;
const POINTS = 5;

function fly(t, racer) {
  const [_, speed, max, rest] = racer;
  const seg = t % (max + rest);
  if (seg < max) {
    racer[DIST] += speed;
  }
}

const racers = [];
const lines = getDataLines(day);
for (const line of lines) {
  const [_, who, speed, max, rest] = line.match(
    /(\w+) .+ (\d+) km.s for (\d+) seconds, .+ for (\d+) s/
  );
  racers.push([who, +speed, +max, +rest, 0, 0]);
}

for (let i = 0; i < time; i++) {
  let best = 0;
  for (const racer of racers) {
    fly(i, racer);
    best = Math.max(best, racer[DIST]);
  }
  for (const racer of racers) {
    if (racer[DIST] === best) racer[POINTS] += 1;
  }
}

const answer = Math.max(...racers.map((r) => r[POINTS]));

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
