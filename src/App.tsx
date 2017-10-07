import * as React from 'react';
import './App.css';
import api from './api';
import PunchCard from './PunchCard';
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

  public render() {

    return (
      <div className="App">
        <PunchCard foods={this.state.foods}/>
      </div>
    );
  }
}

export default App;
