import * as React from 'react';
import { User } from '../interfaces/user';
import food from '../interfaces/food';

const CLIENT_ID = 2;

declare var healthcloud_sdk: any;

interface props {
  addFood: (food: food) => void;
}

interface state {
  user: User | null;
  isLoggedIn: boolean;
}
export default class Login extends React.Component<props, state> {
  private hc: any;

  constructor() {
    super();

    this.hc = new healthcloud_sdk({
      clientId: CLIENT_ID,
    });

    this.state = {
      user: this.getUser(),
      isLoggedIn: false,
    };
  }


  private mountContainer(element: HTMLElement | null) {
    if (element && this.state.isLoggedIn === false) {
      this.hc.getLoginForm(element, (err: any) => {
        if (err) {
          throw new Error(err);
        }
        this.setState({
          user: this.getUser(),
          isLoggedIn: true,
        });
        this.getRecords();
      });
    }
  }

  private getRecords() {
    if (this.state.user) {
      this.hc.searchRecords({
        user_ids: [this.state.user.user_id],
      }).then((records: {record_id: string}[]) => {
        records.forEach((record) => {
          if (!this.state.user) {
            throw new Error('No userid found');
          }
          this.hc.downloadDocument(this.state.user.user_id, record.record_id).then((record: {document: string}) => {
            const food = JSON.parse(record.document);
            food.date = new Date(food.date * 1000);
            
            this.props.addFood(food);
          }).catch((error: any) => {
            console.error(error);
          });
        });
      }).catch(() => {
        debugger;
      });
    }
    
  }

  private getUser(): User | null {
    const user = this.hc.getUser();
    if (user === 'User not logged in') {
      return null;
    }
    return user;
  }

  public render() {
    return (<div>
      {this.state.isLoggedIn === true && this.state.user ?
        <span>Eingeloggt als <strong>{this.state.user.user_name}</strong></span>
      :
        <div ref={this.mountContainer.bind(this)}></div>
      }

    </div>);
  }
}
