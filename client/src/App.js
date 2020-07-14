import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import JobPostings from './components/JobPosts/JobPostings';
import Profile from './components/Profile/Profile';
import PaymentRegistration from './components/PaymentRegistration/PaymentRegistration'
import Cooks from './components/Cooks/Cooks'
import UserProfile from './components/UserProfile/UserProfile'
import Menu from './components/Menu/Menu'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import BootstrapNav from './components/BootstrapNav';
import PrivateRoute from './components/PrivateRoute'
import {CookiesProvider} from 'react-cookie'
import { UserContext } from './components/UserContext';
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51GwKF8JLaX7NQDflmvuMhiPwEGcACEsKPTtpUjg5hlGQz5NDu70UZFEgiecFEVYD5afBSEuXOYXpKuqkP1bEGQ0e00ETnJiqXP');

function App() {

  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    let mounted = true
    
    axios.get(`/get-session`,{
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(idRes => {
        console.log('App.js info',idRes)
        if(mounted){
          setUser(idRes.data.userInfo)
          setMenu(idRes.data.menuInfo)
        }            
      })

    return () => mounted = false
  },[setMenu, setUser])

  return (
    <CookiesProvider>
      <Elements stripe={stripePromise}>
        <Router> 
          <UserContext.Provider value={{user, menu}}>
            <BootstrapNav/>
          </UserContext.Provider> 
            <Switch>
              
              
              <PrivateRoute path="/home" user={user} setUser={setUser} menu={menu} setMenu={setMenu}>     
                <Route exact strict component={Home}/>
              </PrivateRoute>

              <PrivateRoute path="/profile" user={user} setUser={setUser} menu={menu} setMenu={setMenu}>
                <Route render={(props) => <Profile />}/>
              </PrivateRoute>

              <PrivateRoute path="/payment-registration" user={user} setUser={setUser} menu={menu} setMenu={setMenu}>
                <Route render={(props) => <PaymentRegistration />}/>
              </PrivateRoute>

              <UserContext.Provider value={{user, menu}}>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/cooks"  exact strict component={Cooks} />
                <Route path="/job-postings"  exact strict component={JobPostings} />
                <Route path="/user/profile"  exact strict component={UserProfile} />
                <Route path="/menu"  exact strict component={Menu} />
                <Route path="/login"  exact strict component={Login} />
                <Route path="/register"  exact strict component={Register} />  
                {/* <Route path="/payment-registration"  exact strict component={PaymentRegistration} />  */}
              </UserContext.Provider>       
            </Switch>
        </Router>
      </Elements>
    </CookiesProvider>

  );
}

export default App;
