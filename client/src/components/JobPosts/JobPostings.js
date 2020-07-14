import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import JobPost from './JobPost'
import Spinner from 'react-bootstrap/Spinner';
import {UserContext} from '../UserContext'
import {Container, PageHeader} from '../GeneralStyles'

function JobPostings() {
    let {user, menu} = useContext(UserContext)
    console.log('JOB POSTINGS USER CONTEXT', user, menu)


    const [postsArray, setPostsArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

    //states for inputs

    useEffect(() => {
        const getJobs = async () => {
            try {
                let response = await axios.get('api/get/jobs')
                setLoading(false)
                let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                setPostsArray(sorted)
                setError('');
            } catch (error) {
                console.log(error);
                setLoading(false)
                setPostsArray([])
                setError('Something went wrong!');
            }
        }

        getJobs()
  
    },[])

    return (
            <Container>
                <PageHeader>Jobs Posted</PageHeader>
                {loading ? <div className="job-post-spinner"><Spinner animation="border" variant="info" /> </div> : postsArray.map((element,index) => <JobPost  key = {index} uniqueID = {element._id} summary={element.summary} description={element.description} peopleAmount={element.peopleAmount} location={element.location} eventDate={element.date} userPosted={element.username} applications={element.applications} pricePerPerson={element.price}/>)}
                {err ? err : null}        

            </Container>


    )
}

export default JobPostings
