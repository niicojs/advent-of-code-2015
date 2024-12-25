import { consola } from 'consola';
import clipboard from 'clipboardy';
import { formatElapsedTime, getCurrentDay, getRawData, sum } from '../utils.js';

consola.wrapAll();

const day = getCurrentDay();

consola.start('Starting day ' + day);
const begin = new Date().getTime();

const data = JSON.parse(getRawData(day));

function traverse(obj) {
  if (Array.isArray(obj)) {
    return sum(obj.map(traverse));
  } else if (typeof obj === 'object') {
    let val = 0;
    for (const key in obj) {
      if (obj[key] === 'red') return 0;
      val += traverse(obj[key]);
    }
    return val;
  } else if (typeof obj === 'number') {
    return obj;
  }
  return 0;
}

const answer = traverse(data);

consola.success('result', answer);
consola.success('Elapsed:', formatElapsedTime(begin - new Date().getTime()));
consola.success('Done.');
clipboard.writeSync(answer?.toString());
