import hour from '../interfaces/hour';

const MIDNIGHT = 24;
const HOUR_COUNT = 12;
const SLOT_LENGTH = MIDNIGHT / HOUR_COUNT;

// function addLeadingZero(value: string) {
//   return value.length === 1 ? '0' + value : value;
// }

const result: hour[] = [];

for (let i = 0; i <= HOUR_COUNT; i += 1) {
  result.push({
    from: i * SLOT_LENGTH,
    to: (i + 1) * SLOT_LENGTH,
    label: i * SLOT_LENGTH + '',
  });
}

export default result;
