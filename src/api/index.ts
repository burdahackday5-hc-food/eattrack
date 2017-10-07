import food from '../interfaces/food';

class Api {
  getFood() {
    return new Promise<food[]>((resolve) => {
      resolve([{
        description: 'foo',
        date: new Date(),
      }, {
        description: 'bar',
        date: new Date(),
      }]);
    });
  }
}

export default new Api();
