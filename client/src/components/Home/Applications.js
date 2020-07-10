import React, {useState, useEffect} from 'react'
import '../../styles/HomeJobPost.css'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Book from '../Book'

function Applications({cook, postID, listKey,hired, pricePerPerson, peopleAmount, summary}) {
    const [fullname,setFullname] = useState('');
    const [visibility,setVisibility] = useState(false);

    let history = useHistory()

    useEffect(() => {
        let mounted = true;
        axios.get(`/api/get/username/${cook}`)
        .then(response => mounted ? setFullname(`${response.data.firstName} ${response.data.lastName}`) : console.log('not mounted'))
        return () => mounted = false;
    }, [cook])


    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    const rejectCook = async () => {
        try{
            let res = await axios.post('/api/post/reject-cook', {username: cook, postID: postID})
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <li className="cook-name" id = {`app-${listKey}`}>
            <div>
                <Link to ={`/user/profile?user=${cook}`} className="links" >
                    {fullname === '' ? cook : fullname}
                </Link>
                </div>
                <div style={{padding: '10px', width: '260px'}}>
                { hired === cook ?
                <>
                <Button variant="outline-info" style={{marginLeft: '5px'}} onClick={() => history.push(`/user/profile?user=${cook}`)}>
                    Contact
                </Button></>  :
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
                {visibility === true ? <Book eventID={postID} chef={cook} eventTitle={summary} peopleAmount={peopleAmount} pricePerPerson={pricePerPerson} cancel={cancelItem} setVisibility={setVisibility}/> : <></>}
            </li>
        </>
    )
}

export default Applications
