import * as React from 'react';
import food from '../interfaces/food';

import day from '../interfaces/day';
import hour from '../interfaces/hour';
import days from '../constants/days';
import hours from '../constants/hours';

const X_OFFSET = 50;
const X_FACTOR = 30;
const Y_OFFSET = 50;
const Y_FACTOR = 30;
const MAX_CIRCLE = 15;

const GRAPH_WIDTH = 900;
const GRAPH_HEIGHT = 300;

interface props {
  value: food[];
  onChange: (food: food[]) => void;
}

class PunchCard extends React.Component<props, {}> {
  private getTimedFood(day: day, hour: hour) {
    return this.props.value.filter((food) => {
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
    if (highestSlot === 0) {
      return 0;
    } else {
      return (currentSlot / highestSlot) * MAX_CIRCLE;
    }
  }

  public render() {
    const highestSlot = this.getHighestSlot();

    return (
      <svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        {days.map((day, dayIndex) =>
          <g key={day.value} data-day={day.label}>
            {day.label}
            {hours.map((hour, hourIndex) => {
              const slotFoods = this.getTimedFood(day, hour);
              return <circle
                key={hour.label}
                data-hour={hour.label}
                cx={this.getX(hourIndex)}
                cy={this.getY(dayIndex)}
                onClick={() => this.props.onChange(slotFoods)}
                r={this.getRadius(highestSlot, slotFoods.length)} />;
            })}
          </g>,
        )};
      </svg>
    );
  }
}

export default PunchCard;
