import React, {useState, useEffect} from 'react'
import '../styles/HomeJobPost.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Applications({cook, postID, listKey,hired}) {
    const [fullname,setFullname] = useState('');

    useEffect(() => {
        axios.get(`/api/get/username/${cook}`)
        .then(response => setFullname(`${response.data.firstName} ${response.data.lastName}`))
    }, [cook])

    useEffect(() => {
        console.log(hired, cook)
        if(hired === cook){
            document.getElementById(`app-${listKey}`).style.backgroundColor="#d7eee1"
            document.getElementById(`btn-${listKey}`).innerText="Hired!"
            document.getElementById(`btn-${listKey}`).style.pointerEvents="none"
        }
    }, [hired, cook, listKey])

    const handleBook = (event) => {
        alert(`Are you sure you want to book ${fullname}?`)
        const data = {
            cook: cook,
            postID: postID
        }
        axios.post('/api/post/confirm-cook', data)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

        event.target.innerText = "Hired!";
        document.getElementById(`app-${listKey}`).style.backgroundColor="#d7eee1"
    }

    return (
        <li className="cook-name" id = {`app-${listKey}`}>
            <button className="book-user-btn" onClick={handleBook} id={`btn-${listKey}`}>
                {hired === cook ? "Hired!" : "Book"}
            </button>
            <Link to ={`/user/profile?user=${cook}`} className="links" >
                {fullname === '' ? cook : fullname}
            </Link>
        </li>
    )
}

export default Applications
