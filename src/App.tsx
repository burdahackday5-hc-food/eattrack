import * as React from 'react';
import './App.css';
import api from './api';
import food from './interfaces/food';
import day from './interfaces/day';
import hour from './interfaces/hour';
import days from './constants/days';
import hours from './constants/hours';

const X_OFFSET = 50;
const X_FACTOR = 30;
const Y_OFFSET = 50;
const Y_FACTOR = 30;
const MAX_CIRCLE = 15;

const GRAPH_WIDTH = 900;

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

  private getTimedFood(day: day, hour: hour) {
    return this.state.foods.filter((food) => {
      return food.date.getDay() === day.value &&
             (food.date.getHours() >= hour.from && food.date.getHours() <= hour.to);
    });
  }

  private getHighestSlot() {
    let highestSlot = 0;
    for (let dayIndex = 0; dayIndex < days.length; dayIndex += 1) {
      for (let hourIndex = 0; hourIndex < hours.length; hourIndex += 1) {
        const currentSlot = this.getTimedFood(days[dayIndex], hours[hourIndex]).length;
        if (currentSlot > highestSlot) {
          highestSlot = currentSlot;
        }
      }
    }
    return highestSlot;
  }

  private getX(index: number) {
    return index * X_FACTOR + X_OFFSET;
  }

  private getY(index: number) {
    return index * Y_FACTOR + Y_OFFSET;
  }

  private getRadius(highestSlot: number, currentSlot: number) {
    return (currentSlot / highestSlot) * MAX_CIRCLE;
  }

  public render() {
    const highestSlot = this.getHighestSlot();

    return (
      <div className="App">
        <svg width={GRAPH_WIDTH} height="500px">
          {days.map((day, dayIndex) =>
            <g key={day.value} data-day={day.label}>
              {day.label}
              {hours.map((hour, hourIndex) =>
                <circle
                  key={hour.label}
                  data-hour={hour.label}
                  cx={this.getX(hourIndex)}
                  cy={this.getY(dayIndex)}
                  r={this.getRadius(highestSlot, this.getTimedFood(day, hour).length)}
                />,
              )}
            </g>,
          )};
        </svg>
      </div>
    );
  }
}

export default App;
