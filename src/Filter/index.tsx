import * as React from 'react';
import './filter.css';

interface props {
  value: number;
  onChange: (value: number) => void;
}

const FILTERS = ['All', 'Kohlenhydrate', 'Small Portion', 'Low Sodium'];

class App extends React.Component<props, {}> {
  public render() {
    return (
      <ul>
        {FILTERS.map((filter, index) =>
          <li 
            onClick={() => this.props.onChange(index)}
            className={this.props.value === index ? 'filter--activated' : ''}>{filter}</li>,
        )}
      </ul>
    );
  }
}

export default App;
