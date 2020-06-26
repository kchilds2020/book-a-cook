import React, {useState} from 'react';
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


const stripePromise = loadStripe('pk_test_51GwKF8JLaX7NQDflmvuMhiPwEGcACEsKPTtpUjg5hlGQz5NDu70UZFEgiecFEVYD5afBSEuXOYXpKuqkP1bEGQ0e00ETnJiqXP');

function App() {
  const [authenticated, setAuthentication] = useState(false);
  const [identification, setIdentification] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cookSpecialty, setCookSpecialty] = useState('');
  const [cookDescription, setCookDescription] = useState('');
  const [cookPrice, setCookPrice] = useState('');
  const [cook, setCook] = useState('');
  const [picture, setPicture] = useState('');
  const [photos, setPhotos] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  return (
    <CookiesProvider>
    <Elements stripe={stripePromise}>
{/*       <Auth authenticated = {authenticated} identification = {identification} setAuthentication={setAuthentication} setIdentification={setIdentification} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername} setEmail={setEmail} setCookDescription={setCookDescription} setCookSpecialty={setCookSpecialty} setCookPrice={setCookPrice} setCook={setCook} setPicture={setPicture} setPhotos={setPhotos} username={username} setMenuItems={setMenuItems}/>
 */}      <Router> 
        <BootstrapNav />
              <Switch>
                <Route path="/" exact strict component={Landing}/>


                <PrivateRoute path="/home" authenticated = {authenticated} setAuthentication={setAuthentication} >
                  <Route 
                    render={(props) => <Home {...props} identification = {identification} username={username} firstname = {firstname} cook={cook}  setUsername={setUsername} setFirstname={setFirstname} setCook={setCook}/> }/>
                </PrivateRoute>


                <Route path="/cooks" exact component={Cooks} />
                <Route 
                  path="/cooks"  
                  render={(props) => <Cooks {...props} cook = {cook}/>}/>
                <Route 
                  path="/job-postings"  
                  render={(props) => <JobPostings {...props} username={username} cook = {cook}/>}/>
                <Route 
                  path="/user/profile"  
                  render={(props) => <UserProfile {...props} userSessionName={username} cook ={cook}/>}/>
                  <Route 
                  path="/menu"  
                  render={(props) => <Menu {...props} firstname = {firstname} lastname = {lastname} email = {email} cook={cook}/>}/>


                <PrivateRoute path="/profile" authenticated = {authenticated} setAuthentication={setAuthentication} >
                <Route 
                  path="/profile"  
                  render={(props) => <Profile {...props} setIdentification={setIdentification} identification = {identification} username={username} firstname = {firstname} lastname = {lastname} email = {email} cookSpecialty={cookSpecialty} cookDescription={cookDescription} cookPrice={cookPrice} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername} setEmail={setEmail} setCookDescription={setCookDescription} setCookSpecialty={setCookSpecialty} setCookPrice={setCookPrice} cook={cook} setCook={setCook} picture={picture} setPicture = {setPicture} photos={photos} setPhotos={setPhotos} menuItems={menuItems} setMenuItems={setMenuItems}/>}/>
                </PrivateRoute>


                <Route 
                  path="/login"  
                  render={(props) => <Login {...props} setAuthentication={setAuthentication} setIdentification={setIdentification} />}/>
                <Route 
                  path="/register"  
                  render={(props) => <Register {...props} setAuthentication={setAuthentication} setIdentification={setIdentification}/>}/>
            </Switch>
        </Router>
        </Elements>
        </CookiesProvider>

  );
}

export default App;
