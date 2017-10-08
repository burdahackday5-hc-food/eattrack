import * as React from 'react';
import answers from '../constants/answers';
import food from '../interfaces/food';


interface props {
  value: food[];
}

class Filter extends React.Component<props, {}> {
  public render() {
    return (
      <ul>
        {this.props.value.map((food, index) =>
          <li key={index}>{food.date.toLocaleString()} — {food.description}:&nbsp;
            {food.answers.map((answer: any, answerIndex: number) => ' ' + (answer ? answers[answerIndex] : ''))}
          </li>,
        )}
      </ul>
    );
  }
}

export default Filter;
