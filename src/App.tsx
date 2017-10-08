import * as React from 'react';
import './App.css';
// import api from './api';
import PunchCard from './PunchCard';
import FoodList from './FoodList';
import Filter from './Filter';
import food from './interfaces/food';
import Login from './Login';

interface state {
  foods: food[];
  selectedFoods: food[];
  filter: number;
}

class App extends React.Component<{}, state> {
  constructor() {
    super();
    this.state = { foods: [], selectedFoods: [], filter: 0 };

    // api.getFood().then((foods) => {
    //   this.setState({ foods });
    // });
  }

  private filterChange(filter: number) {
    this.setState({ filter, selectedFoods: [] });
  }

  private getFilteredFoods() {
    if (this.state.filter === 0) {
      return this.state.foods;
    } else {
      return this.state.foods.filter((food) => {
        return food.answers[this.state.filter - 1];
      });
    }
  }

  private foodSelection(selectedFoods: food[]) {
    this.setState({ selectedFoods });
    console.log(selectedFoods);
  }

  private addFood(food: food) {
    this.setState({
      foods: this.state.foods.concat(food),
    });
  }

  public render() {
    return (
      <div className="App">
        <Login addFood={(food: food) => this.addFood(food)}/>
        {this.state.foods.length > 0 && 
          <span>
            <Filter value={this.state.filter} onChange={this.filterChange.bind(this)}/>
            <PunchCard value={this.getFilteredFoods()} onChange={this.foodSelection.bind(this)}/>
            <FoodList value={this.state.selectedFoods}/>
          </span>
        }
      </div>
    );
  }
}

export default App;
