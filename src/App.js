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

  return (
      <Router> 
        <Auth authenticated = {authenticated} setAuthentication={setAuthentication} setIdentification={setIdentification}/>  

            <Switch>
                <Route path="/" exact strict component={Landing}/>
                <Route path="/home" exact component={Home} />
                <Route path="/cooks" exact component={Cooks} />
                <Route path="/home/job-postings" exact component={JobPostings}/>
                {/* <Route path="/home/profile" exact component={Profile}/> */}
                <Route 
                  path="/profile"  
                  render={(props) => <Profile {...props} identification = {identification}/>}/>

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
