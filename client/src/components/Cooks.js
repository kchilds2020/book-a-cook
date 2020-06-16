import React, {useState, useEffect} from 'react'
import '../styles/CookSummary.css'
import Cook from './Cook'
import axios from 'axios';
import NavBar from './NavBar';
import Filter from './Filter';
import '../styles/Cooks.css'


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
            <NavBar active={'cooks-item'}/>
            <div className="cooks-container">
                <Filter />  
                {loading ? 'LOADING...' : cooksArray.map((element,index) => <Cook  key = {index} firstname={element.firstName} lastname={element.lastName} specialty={element.cookSpecialty} price={element.cookPrice} description={element.cookDescription} latitude={element.latitude} longitude={element.longitude} username={element.username} picture={element.picture}/>)}
                {err ? err : null}
            </div>
        </>
    )
}

export default Cooks
