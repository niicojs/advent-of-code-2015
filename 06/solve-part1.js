import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getDataLines } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const key = (x, y) => `${x},${y}`;
const lights = new Map();

const lines = getDataLines(day);
for (const line of lines) {
  const [_, action, x1, y1, x2, y2] = line.match(
    /(.+)\s(\d+)\,(\d+) through (\d+)\,(\d+)/
  );
  for (let i = +x1; i <= +x2; i++) {
    for (let j = +y1; j <= +y2; j++) {
      const k = key(i, j);
      if (action === 'turn on') {
        lights.set(k, true);
      } else if (action === 'turn off') {
        lights.set(k, false);
      } else if (action === 'toggle') {
        lights.set(k, !lights.get(k));
      }
    }
  }
}

let answer = Array.from(lights.values()).filter(Boolean).length;

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
