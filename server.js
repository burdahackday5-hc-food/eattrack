const http = require('http');
const chance = require('chance')();

const FOOD_AMOUNT = 100;
const foods = [];

for(let i = 0; i < FOOD_AMOUNT; i += 1) {
  foods.push({
    description: chance.word(),    
    date: chance.date({year: 2017}),
  });
}

console.log(foods);

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.end(JSON.stringify(foods));
}).listen(8080);
