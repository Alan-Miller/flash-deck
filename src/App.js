import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Play from './components/PlayAndQuiz/Play';
import Quiz from './components/PlayAndQuiz/Quiz';
import Share from './components/Share/Share';
import Manage from './components/Manage/Manage';
import Settings from './components/Settings/Settings';

export default class App extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        
        <Route exact path="/" component={Home} />
        <Route path="/play" component={Play} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/share" component={Share} />
        <Route path="/manage" component={Manage} />
        <Route path="/settings" component={Settings} />
        <Redirect path="/*" to="/" />
      </Switch>
    )
  }
}