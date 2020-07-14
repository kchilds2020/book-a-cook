import React, {useState} from 'react'
import Applications from './Applications';
import {JobPostContainer, NumColorLight, JobPostTitle} from './HomeStyles'

function HomeJobPost({summary, applications, postID, listID, cook, pricePerPerson, peopleAmount}) {

    const [visibility, setVisibility] = useState(false)

    const toggleApplicants = (e) => {
        e.preventDefault()

        visibility ? setVisibility(false) : setVisibility(true)
    }

    return (
        <>
            <JobPostContainer onClick={toggleApplicants}>
                <JobPostTitle>{summary}</JobPostTitle>
                    <div style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px'}} onClick={toggleApplicants}>
                        {cook === 'pending' ? <><NumColorLight>{applications.length}</NumColorLight> applied</> : <><NumColorLight>{cook}</NumColorLight> Hired!</> }
                    </div>
                
            </JobPostContainer>
            {visibility ? applications.map((user,index) => <Applications key = {index} cook={user} postID={postID} listKey={index} hired={cook} pricePerPerson={pricePerPerson} peopleAmount={peopleAmount} summary={summary}/>) : <></>}
        </>
    )
}

export default HomeJobPost
