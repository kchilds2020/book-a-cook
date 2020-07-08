import React from 'react'
import '../styles/JobForm.css'
import Button from 'react-bootstrap/Button'

function JobForm({handleSubmit, setDate, setDescription, setPeopleAmount, setLocation, setSummary, cancelPost, setPricePerPerson}) {
    return (
        <div>
            <form className = "form-job" onSubmit = {handleSubmit}>
                    <label htmlFor = "event-summary">Event Summary</label>
                    <input type="text" name = "event" id = "event-summary" className = "jp-inputs" onChange={event => setSummary(event.target.value)}/>
                    <label htmlFor = "event-description">Event Description</label>
                    <textarea type="text" name = "event-description" id = "event-description" className = "jp-inputs" onChange={event => setDescription(event.target.value)}/>
                    <label htmlFor = "people-amount">Amount of People</label>
                    <input type="text" name = "people-amount" id = "people-amount" className = "jp-inputs" onChange={event => setPeopleAmount(event.target.value)}/>
                    <label htmlFor = "price-per-person">Price Per Person</label>
                    <input type="number" name = "people-per-person" id = "people-per-person" className = "jp-inputs" onChange={event => setPricePerPerson(event.target.value)}/>
                    <label htmlFor = "event-location">Location of Event</label>
                    <input type="text" name = "event-location" id = "event-location" className = "jp-inputs" onChange={event => setLocation(event.target.value)}/>
                    <label htmlFor = "event-date">Date of Event</label>
                    <input type="date" name = "event-date" id = "event-date" className = "jp-inputs" onChange={event => setDate(event.target.value)}/>
                    {/* <div className = "btns">
                        <input type="submit" value = "Submit!" className="create-post-btn"/>
                        <button type="reset" className = "cancel-post-btn" onClick = {cancelPost}>Cancel</button>
                    </div> */}
                    <Button type="submit" variant="primary" style={{marginTop: '10px'}} block>Create Job</Button>
                    <Button variant="danger" className="delete-jf-btn" onClick={cancelPost}>x</Button>
                </form>
        </div> 
    )
}

export default JobForm
