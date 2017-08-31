import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Play from './components/Play';
import Share from './components/Share';
import Manage from './components/Manage';
import Settings from './components/Settings';

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
        <Route path="/share" component={Share} />
        <Route path="/manage" component={Manage} />
        <Route path="/settings" component={Settings} />
      </Switch>
    )
  }
}