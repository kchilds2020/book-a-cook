import React from 'react'
import '../styles/HomeJobPost.css'
import Applications from './Applications';

function HomeJobPost({summary, applications, postID, listID, cook}) {

    const showCount = (event) => {
        let list = document.getElementById(`list-${event.target.id}`)
        if(list !== null){
            list.style.visibility = list.style.visibility === 'visible' ? 'hidden' : 'visible'
            list.style.height = list.style.visibility === 'visible' ? 'auto' : '0px'
        }
     }

    return (
        <>
            <div className="sum-container" onClick={showCount} id={`${listID}`}>
                <div className ="summary">
                    {summary}
                </div>
                <div className ="applications">
                    <button className ="count-applied" onClick={showCount} id={`${listID}`}>
                        {cook === 'pending' ? <><span className="num-applied">{applications.length}</span> applied</> : <><span className="num-applied">{cook}</span> Hired!</> }
                    </button>
                </div>
            </div>
            <ul className="cook-list" id={`list-${listID}`}>
    {applications.map((user,index) => <Applications key = {index} cook={user} postID={postID} listKey={index} hired={cook}/>)}
            </ul>
        </>
    )
}

export default HomeJobPost
