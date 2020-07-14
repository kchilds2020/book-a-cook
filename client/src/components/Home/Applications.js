import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Book from '../PopUps/Book'
import {ApplicationContainer, LinkToProfile} from './HomeStyles'
import Spinner from 'react-bootstrap/Spinner'
import Overlay from '../PopUps/Overlay'

function Applications({cook, postID, listKey,hired, pricePerPerson, peopleAmount, summary}) {
    const [fullname,setFullname] = useState('');
    const [visibility,setVisibility] = useState(false);

    let history = useHistory()

    useEffect(() => {
        const getCook = async () => {
            try{
            let response = await axios.get(`/api/get/username/${cook}`)
            setFullname(`${response.data.firstName} ${response.data.lastName}`)
            }catch(error){console.log(error)}
        }
        getCook()

    }, [cook])


    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    const rejectCook = async () => {
        try{
            console.log('rejecting cook')
            let res = await axios.post('/api/post/reject-cook', {username: cook, postID: postID})
            alert(res.data)
            window.location.href = '/home'
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <ApplicationContainer id = {`app-${listKey}`}>
                <LinkToProfile href ={`/user/profile?user=${cook}`}>{fullname === '' ? <Spinner animation="border" variant='info'/> : fullname}</LinkToProfile>

            <div style={{padding: '10px', width: '260px'}}>
                { hired === cook ? <Button variant="outline-info" style={{marginLeft: '5px', float: 'right'}} onClick={() => history.push(`/user/profile?user=${cook}`)}> Contact </Button>  :
                <>
                    <Button variant="outline-primary" style={{marginLeft: '5px'}} onClick={() => setVisibility(true)}>
                        Book
                    </Button>
                    <Button variant="outline-info" style={{marginLeft: '5px'}} onClick={() => history.push(`/user/profile?user=${cook}`)}>
                        Contact
                    </Button>
                    <Button variant="outline-danger" style={{marginLeft: '5px'}} onClick={rejectCook}>
                        Reject
                    </Button> 
                </>
                }
            </div>
                
                {/* {visibility === true ? <Confirm message={`Are you sure you want to book ${cook}?`} cancel={cancelItem} confirm={bookItem} /> : <></>} */}
                {visibility === true ? <><Book eventID={postID} chef={cook} eventTitle={summary} peopleAmount={peopleAmount} pricePerPerson={pricePerPerson} cancel={cancelItem} setVisibility={setVisibility}/><Overlay setVisibility={setVisibility}/></> : <></>}
            </ApplicationContainer>
        </>
    )
}

export default Applications
