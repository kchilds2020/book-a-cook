import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
      <Router> 
        <div className = 'nav-bar'>
              <ul>
                <li>
                  <Link to ="/">Landing</Link>
                </li>
                <li>
                  <Link to ="/home">Home</Link>
                </li>
                <li>
                  <Link to ="/login">Login</Link>
                  </li>
                <li>
                  <Link to ="/register">Register</Link>
                  </li>
              </ul>
        </div>
            <Switch>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/home" exact strict component={Home}/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/register" exact strict component={Register}/>
            </Switch>
        </Router>

  );
}

export default App;
