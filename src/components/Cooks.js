import React, {useState, useEffect} from 'react'
import PIC from '../images/pic.jpeg';
import '../styles/CookSummary.css'
import Cook from './Cook'
import axios from 'axios';

function Cooks() {
    const [cooksList, setCooksList] = useState([]);

    useEffect(() => {
        axios.get('http://localhose:5000/api/get/cooks')
        .then(response => {
            let cookArray = [];
            response.data.forEach(element => {
                cookArray.push(<Cook  firstname={element.firstName} lastname={element.lastName} specialty={element.specialty} price={element.price} description={element.cooksDescription}/>);
            });
            setCooksList(cookArray);
        })
        .catch(err => console.log(err))
    }, [])
    
    return (
        <>
           {cooksList}
        </>
    )
}

export default Cooks
