import * as React from 'react';
import './App.css';
// import * as d3 from 'd3';
import api from './api';
import food from './interfaces/food';
import day from './interfaces/day';
import hour from './interfaces/hour';
import days from './constants/days';
import hours from './constants/hours';

interface state {
  foods: food[];
}

class App extends React.Component<{}, state> {
  constructor() {
    super();
    this.state = { foods: [] };

    api.getFood().then((foods) => {
      this.setState({ foods });
    });
  }

  getTimedFood(day: day, hour: hour) {
    return this.state.foods.filter((food) => {
      return food.date.getDay() === day.value && food.date.getHours() === hour.value;
    });
  }

  render() {
    return (
      <div className="App">
        {days.map(day =>
          <div key={day.value} data-day={day.label}>
            {day.label}
            {hours.map(hour =>
              <span key={hour.value} data-hour={hour.label}>{this.getTimedFood(day, hour).length}</span>,
            )}
          </div>,
        )};

        {/* <svg width="100%" height="500px">

        </svg> */}
      </div>
    );
  }
}

export default App;
