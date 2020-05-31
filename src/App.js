import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import JobPostings from './components/JobPostings';
import Profile from './components/Profile';
import Auth from './components/Auth'


function App() {

  return (
      <Router> 
        <Auth />  

            <Switch>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/home" exact component={Home} />
                <Route path="/home/job-postings" exact component={JobPostings}/>
                <Route path="/home/profile" exact component={Profile}/>
                <Route path="/login" exact strict component={Login}/>
                <Route path="/register" exact strict component={Register}/>
            </Switch>
        </Router>

  );
}

export default App;
