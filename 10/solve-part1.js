import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getRawData } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

let input = getRawData(day);

function step(str) {
  let output = '';
  for (let i = 0; i < str.length; i++) {
    let nb = 1;
    let c = str[i];
    while (i + 1 < str.length && str[i + 1] === c) {
      nb++;
      i++;
    }
    output += nb + c;
  }
  return output
}

for (let i = 0; i < 50; i++) {
  input = step(input);
}
let answer = input.length;

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
