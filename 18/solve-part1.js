import { consola } from 'consola';
import clipboard from 'clipboardy';
import {
  enumGrid,
  getCurrentDay,
  getDataLines,
  getGrid,
  getNeighbors,
  inGridRange,
  newGrid,
  printGrid,
  timer,
} from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();
consola.start('Starting day ' + day);
const t = timer();

let grid = getGrid(getDataLines());
const h = grid.length;
const w = grid[0].length;

const step = () => {
  const next = newGrid(h, w, '.');
  for (const { x, y, cell } of enumGrid(grid)) {
    const on = getNeighbors(x, y).filter(
      ([nx, ny]) => inGridRange(grid, nx, ny) && grid[ny][nx] === '#'
    ).length;
    next[y][x] = cell;
    if (cell === '#' && on !== 2 && on !== 3) next[y][x] = '.';
    if (cell === '.' && on === 3) next[y][x] = '#';
  }
  return next;
};

for (let i = 0; i < 100; i++) {
  grid = step();
}
printGrid(grid);

let answer = 0;
for (const { cell } of enumGrid(grid)) {
  if (cell === '#') answer++;
}

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());
