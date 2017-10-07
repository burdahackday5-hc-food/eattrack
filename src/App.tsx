import * as React from 'react';
import './App.css';
// import * as d3 from 'd3';
import api from './api';
import food from './interfaces/food';

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

  render() {
    return (
      <div className="App">
        {this.state.foods.map(food =>
          <div>{food.description}</div>,
        )}
        {/* <svg width="100%" height="500px">

        </svg> */}
      </div>
    );
  }
}

export default App;
