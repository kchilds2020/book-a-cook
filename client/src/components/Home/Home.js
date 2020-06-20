import React from 'react';
import NavBar from '../NavBar'
import '../../styles/Home.css'
import '../../App.css'
import JobPosts from './JobPosts'
import Events from './Events'



const Home = ({identification, firstname, lastname, email, username, cook}) => {
    console.log('COOK', cook)
    return(
        <div>
            <NavBar active={'home-item'}/>
            <div className = "greeting"><h2>Hello {firstname}!</h2></div>
            <div className="home-container">
                <JobPosts username={username}/>
                {cook ? <Events username={username}/> : <></>}
            </div>
        </div>
    );
};

export default Home;