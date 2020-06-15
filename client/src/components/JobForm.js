import React from 'react'
import '../styles/JobForm.css'

function JobForm({handleSubmit, setDate, setDescription, setPeopleAmount, setLocation, setSummary, cancelPost}) {
    return (
        <div>
            <form class = "form-job" onSubmit = {handleSubmit}>
                    <label htmlFor = "event-summary">Event Summary</label>
                    <input type="text" name = "event" id = "event-summary" className = "jp-inputs" placeholder = "Event Summary" onChange={event => setSummary(event.target.value)}/>
                    <label htmlFor = "event-description">Event Description</label>
                    <textarea type="text" name = "event-description" id = "event-description" className = "jp-inputs" placeholder = "Event Description" onChange={event => setDescription(event.target.value)}/>
                    <label htmlFor = "people-amount">Amount of people that need to be served</label>
                    <input type="text" name = "people-amount" id = "people-amount" className = "jp-inputs" placeholder = "Amount of People" onChange={event => setPeopleAmount(event.target.value)}/>
                    <label htmlFor = "event-location">Location of Event</label>
                    <input type="text" name = "event-location" id = "event-location" className = "jp-inputs" placeholder = "Event Location" onChange={event => setLocation(event.target.value)}/>
                    <label htmlFor = "event-date">Date of Event</label>
                    <input type="date" name = "event-date" id = "event-date" className = "jp-inputs" placeholder = "Date" onChange={event => setDate(event.target.value)}/>
                    <div className = "btns">
                        <input type="submit" value = "Submit!" className="create-post-btn"/>
                        <button type="reset" className = "cancel-post-btn" onClick = {cancelPost}>Cancel</button>
                    </div>
                </form>
        </div>
    )
}

export default JobForm
