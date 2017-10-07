import food from '../interfaces/food';

class Api {
  getFood() {
    return new Promise<food[]>((resolve) => {
      resolve([{
        description: 'foo',
        date: new Date().getTime(),
      }, {
        description: 'bar',
        date: new Date().getTime(),
      }]);
    });
  }
}

export default new Api();
