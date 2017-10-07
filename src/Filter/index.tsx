import * as React from 'react';
import './filter.css';
import answers from '../constants/answers';

interface props {
  value: number;
  onChange: (value: number) => void;
}

const filters = ['All'].concat(answers);

class Filter extends React.Component<props, {}> {
  public render() {
    return (
      <ul>
        {filters.map((filter, index) =>
          <li key={index}
            onClick={() => this.props.onChange(index)}
            className={this.props.value === index ? 'filter--activated' : ''}>{filter}</li>,
        )}
      </ul>
    );
  }
}

export default Filter;
