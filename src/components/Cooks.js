import React, {useState, useEffect} from 'react'
import '../styles/CookSummary.css'
import Cook from './Cook'
import axios from 'axios';


function Cooks() {
    const [cooksArray, setCooksArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        axios.get('api/get/cooks')
        .then(response => {
            if(mounted){
                setLoading(false)
                setCooksArray(response.data)
                setError('');
            }
        })
        .catch(error => {
            setLoading(false)
            setCooksArray([])
            setError('Something went wrong!');
        })
        return () => mounted = false;
  
    },[])
    
    return (
        <>
           {loading ? 'LOADING...' : cooksArray.map((element,index) => <Cook  key = {index} firstname={element.firstName} lastname={element.lastName} specialty={element.specialty} price={element.price} description={element.cooksDescription}/>)}
           {err ? err : null}
        </>
    )
}

export default Cooks
