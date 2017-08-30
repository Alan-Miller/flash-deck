import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Play from './Play';
import Quiz from './Quiz';
import Share from './Share';
import Manage from './Manage';
import Settings from './Settings';

export default class App extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/play" component={Play} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/share" component={Share} />
        <Route path="/manage" component={Manage} />
        <Route path="/settings" component={Settings} />
      </Switch>
    )
  }
}