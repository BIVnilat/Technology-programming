import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import MessageList from './components/messages';
import ServerMessage from './components/serverMessages';

import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src = {logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">Homework</Link> 
          
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Lab2</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/server" className="nav-link">Lab3</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path='/' exact component={MessageList} />
          <Route path='/server' exact component={ServerMessage} />
        </div>
      </Router>
    );
  }
}

export default App;
