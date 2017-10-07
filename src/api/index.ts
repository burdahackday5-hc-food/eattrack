import food from '../interfaces/food';

const API_URL = 'http://localhost:8080';

class Api {
  getFood(): Promise<food[]> {
    return fetch(API_URL, { method: 'get' }).then((response: Response) => {
      return response.json();
    }).then((response) => {
      return response.map((food: any) => {
        return {
          ...food,
          date: new Date(food.date),
        };
      });
    });
  }
}

export default new Api();
