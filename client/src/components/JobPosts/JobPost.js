import React, {useState, useEffect, useContext} from 'react' 
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'
import {PostContainer, SubText, Bold, SameLine, Title, Description} from './JobPostStyles'

function JobPost({summary, description, peopleAmount, location, eventDate, userPosted, uniqueID, applications, pricePerPerson}) {


    let {user, menu} = useContext(UserContext)
    console.log('JOB POST', user, menu)

    let history = useHistory()

    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();
    const [applied,setApplied] = useState(false);

    useEffect(() => {
        let date = new Date(eventDate.slice(0,10));
        let yr = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date)
        let mnth = new Intl.DateTimeFormat('en', {month: 'long'}).format(date)
        let d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date)
 

        setYear(yr)
        setDay(d)
        setMonth(mnth)

        if(applications.length > 0 && user !== null){
            applications.forEach((element) => {
                if(element === user.username){
                    setApplied(true)
                }
            })
        }

    }, [eventDate, user, applications])

    const apply = (event) => {
        if(user === null){
            alert('You must login to apply for jobs')
            history.push('/login')
        }else{
            const data = {
                username: user.username,
                uniqueID: uniqueID
            }
            let btn = event.target
            axios.post(`api/post/apply/job-post`, data)
            .then(response => {
                console.log(response)
                btn.innerText = "Applied!"
                btn.style.backgroundColor="green"
                btn.style.pointerEvents="none"
            })
            .catch(err => console.log(err))
        }   

        
    }
    

    return (
            <PostContainer>
                <Title>{summary}</Title>
                <Description>{description}</Description>
                <SameLine>
                <SubText><Bold>Event Date:</Bold> {month} {day}, {year}</SubText>
                <SubText><Bold>Location:</Bold> {location}</SubText>
                </SameLine>
                <SameLine>
                <SubText><Bold>Amount of People:</Bold> {peopleAmount}</SubText>
                <SubText><Bold>Price Per Person:</Bold> ${pricePerPerson}</SubText>
                </SameLine>
                {applied ? <Button style={{marginTop: '10px'}} variant="success" id="jp-btn" block>Applied!</Button> : <Button style={{marginTop: '10px'}} variant="primary" onClick={apply} id="jp-btn" block>Apply!</Button>}
            </PostContainer>
    )
}

export default JobPost
