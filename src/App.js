import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import JobPostings from './components/JobPostings';
import Profile from './components/Profile';
import Auth from './components/Auth'
import Cooks from './components/Cooks'


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

  return (
      <Router> 
        <Auth authenticated = {authenticated} identification = {identification} setAuthentication={setAuthentication} setIdentification={setIdentification} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername} setEmail={setEmail} setCookDescription={setCookDescription} setCookSpecialty={setCookSpecialty} setCookPrice={setCookPrice} setCook={setCook}/>  

            <Switch>
                <Route path="/" exact strict component={Landing}/>
                <Route 
                  path="/home"  
                  render={(props) => <Home {...props} identification = {identification} username={username} firstname = {firstname} lastname = {lastname} email = {email}/>}/>
                <Route path="/cooks" exact component={Cooks} />
                {/* <Route path="/job-postings" exact component={JobPostings}/> */}
                <Route 
                  path="/job-postings"  
                  render={(props) => <JobPostings {...props} username={username}/>}/>

                {/* <Route path="/home/profile" exact component={Profile}/> */}
                <Route 
                  path="/profile"  
                  render={(props) => <Profile {...props} identification = {identification} username={username} firstname = {firstname} lastname = {lastname} email = {email} cookSpecialty={cookSpecialty} cookDescription={cookDescription} cookPrice={cookPrice} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername} setEmail={setEmail} setCookDescription={setCookDescription} setCookSpecialty={setCookSpecialty} setCookPrice={setCookPrice} cook={cook} setCook={setCook}/>}/>

                <Route 
                  path="/login"  
                  render={(props) => <Login {...props} setAuthentication={setAuthentication} setIdentification={setIdentification} />}/>
                <Route 
                  path="/register"  
                  render={(props) => <Register {...props} setAuthentication={setAuthentication} setIdentification={setIdentification}/>}/>
            </Switch>
        </Router>

  );
}

export default App;
