const http = require('http');
const chance = require('chance')();

const SERVER_PORT = 8082;
const FOOD_AMOUNT = 100;
const ANSWER_COUNT = 3;
const foods = [];

function getAnswers() {
  const result = [];
  for (let i = 0; i < ANSWER_COUNT; i += 1) {
    result.push(chance.bool());
  }
  return result;
}

for(let i = 0; i < FOOD_AMOUNT; i += 1) {
  foods.push({
    description: chance.word(),
    date: chance.date({year: 2017}),
    answers: getAnswers(),
  });
}

console.log(foods);

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.end(JSON.stringify(foods));
}).listen(SERVER_PORT);
