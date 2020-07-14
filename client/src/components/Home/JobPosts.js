import React, {useEffect, useState} from 'react'
import HomeJobPost from './HomeJobPost'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import JobForm from '../PopUps/JobForm'
import {HomeHeader, HomeSectionContainer, UpcomingJobContainer} from './HomeStyles'
import Overlay from '../PopUps/Overlay'

function JobPosts({username}) {

    const [myPosts, setMyPosts] = useState('');
    const [visible, setVisibility] = useState(false);

    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [location, setLocation] = useState('');
    const [summary, setSummary] = useState('');
    const [pricePerPerson, setPricePerPerson] = useState(0)


    useEffect(() => {
        const getMyJobs = async () => {
            try {
                let response = await axios.get(`/api/get/my-jobs/${username}`)
                setMyPosts(response.data);
            } catch (error) {console.log(error)}
            
        }

        if(username !== ''){
             getMyJobs()
        }
     },[username, visible])

     const handleSubmit = async (e) => {
        e.preventDefault()
        const post = {
            summary: summary,
            description: description,
            location: location,
            peopleAmount: peopleAmount,
            date: date,
            username: username,
            price: pricePerPerson
        }
        try{
            const response = await axios.post('/post/create-post', post)
            alert(response.data)
            setVisibility(false)
            setSummary('')
            setDescription('')
            setDate('')
            setPeopleAmount('')
            setLocation('')
        }catch(error){console.log(error)}

        
     }

     const cancelPost = (e) => {
        e.preventDefault()
        setVisibility(false)
        setSummary('')
        setDescription('')
        setDate('')
        setPeopleAmount('')
        setLocation('')
     }

    return (
        <HomeSectionContainer>
            <HomeHeader><span className="post-num">{myPosts.length}</span> Posted Jobs</HomeHeader>
            <UpcomingJobContainer>
                {myPosts.length > 0 ? myPosts.map((element,index) => <HomeJobPost key ={index} summary={element.summary} applications={element.applications} listID = {index} postID = {element._id} cook={element.cook} pricePerPerson={element.price} peopleAmount={element.peopleAmount}/>) : <></>}
            </UpcomingJobContainer>
            <Button variant="primary" onClick={() => setVisibility(true)}style ={{marginTop: '5px'}} block>Create a Post</Button>
            {visible ? <><JobForm handleSubmit={handleSubmit} cancelPost={cancelPost} setDate={setDate} setDescription ={setDescription} setSummary={setSummary} setLocation={setLocation} setPeopleAmount={setPeopleAmount} setPricePerPerson={setPricePerPerson}/><Overlay setVisibility={setVisibility}/></> : <></>}
        </HomeSectionContainer>
    )
}

export default JobPosts
