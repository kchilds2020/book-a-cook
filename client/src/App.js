import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import JobPostings from './components/JobPosts/JobPostings';
import Profile from './components/Profile/Profile';
import Cooks from './components/Cooks/Cooks'
import UserProfile from './components/UserProfile/UserProfile'
import Menu from './components/Menu/Menu'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import BootstrapNav from './components/BootstrapNav';
import PrivateRoute from './components/PrivateRoute'
import {CookiesProvider} from 'react-cookie'
import { UserContext } from './components/UserContext';

const stripePromise = loadStripe('pk_test_51GwKF8JLaX7NQDflmvuMhiPwEGcACEsKPTtpUjg5hlGQz5NDu70UZFEgiecFEVYD5afBSEuXOYXpKuqkP1bEGQ0e00ETnJiqXP');

function App() {

  return (
    <CookiesProvider>
      <Elements stripe={stripePromise}>
        <Router> 
          <BootstrapNav />
            <Switch>
              
              
              <PrivateRoute path="/home" >     
                <Route exact strict component={Home}/>
              </PrivateRoute>

              <PrivateRoute path="/profile" >
                <Route render={(props) => <Profile />}/>
              </PrivateRoute>

              <UserContext.Provider value='add user info here'>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/cooks"  exact strict component={Cooks} />
                <Route path="/job-postings"  exact strict component={JobPostings} />
                <Route path="/user/profile"  exact strict component={UserProfile} />
                <Route path="/menu"  exact strict component={Menu} />
                <Route path="/login"  exact strict component={Login} />
                <Route path="/register"  exact strict component={Register} />     
              </UserContext.Provider>       
            </Switch>
        </Router>
      </Elements>
    </CookiesProvider>

  );
}

export default App;
