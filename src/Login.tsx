import * as React from 'react';
import { User } from './interfaces/user';

declare var healthcloud_sdk: any;

interface state {
  user: User|null;
}
export default class Login extends React.Component<{}, state> {

  private hc: any;

  constructor() {
    super();
    this.hc = new healthcloud_sdk({
      clientId: 1,
    });
    this.state = {
      user: this.getUser(),
    };
  }


  private mountContainer(el: HTMLElement|null) {
    if (el) {
      this.hc.getLoginForm(el, () => {
        this.setState({
          user: this.getUser(),
        });
      });
    }
  }

  public getUser(): User|null {
    const u = this.hc.getUser();
    if (u === 'User not logged in') {
      return null;
    }
    return u;
  }

  public render() {
    return (<div>
      { this.state.user &&
        <span>Eingeloggt als <strong>{this.state.user.user_name}</strong></span>
      }
      { !this.state.user &&
        <div ref={this.mountContainer.bind(this)}></div>
      }
    </div>);
  }
}
