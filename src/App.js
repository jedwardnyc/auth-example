import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Success from './Success';

export default class App extends React.Component {

  render(){
    return (
      <Router>
        <div>
          <Route path='/' exact component={Login} />
          <Route path='/users/:username' render = {({ match, history }) => <Success history={history} user={match.params.username} />} />
        </div>
      </Router>
    )
  }
}