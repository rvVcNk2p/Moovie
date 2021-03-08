import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NavBar from './components/layout/NavBar';
import Home from './components/layout/Home';

const App = () => (
  <Router>
    <Fragment className='App'>
      <NavBar />
      <Route exact path='/' component={Home} />
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
