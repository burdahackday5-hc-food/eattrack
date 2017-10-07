import hour from '../interfaces/hour';

const result: hour[] = [];
const MIDNIGHT = 24;

function addLeadingZero(value: string) {
  return value.length === 1 ? '0' + value : value;
}

for (let i = 0; i <= MIDNIGHT; i += 1) {
  result.push({
    value: i,
    label: addLeadingZero(i + '') + ':00',
  });
}

export default result;
