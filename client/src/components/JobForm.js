import React from 'react'
import Button from 'react-bootstrap/Button'
import {PopUp} from './PopUpStyles'
import InputWithLabel from './Input'
import TextAreaWithLabel from './TextArea'

function JobForm({handleSubmit, setDate, setDescription, setPeopleAmount, setLocation, setSummary, cancelPost, setPricePerPerson}) {
    return (
            <PopUp>
                <form onSubmit = {handleSubmit}>
                        <InputWithLabel type="text" labelText='Event Summary' identifier = "event-summary" setValue={setSummary}/>
                        <TextAreaWithLabel type="text" labelText='Event Description' identifier = "event-description" setValue={setDescription}/>
                        <InputWithLabel type="text" labelText='Amount of People' identifier = "people-amount" setValue={setPeopleAmount}/>
                        <InputWithLabel type="number" labelText='Price Per Person' identifier = "people-per-person"  setValue={setPricePerPerson}/>
                        <InputWithLabel type="text" labelText='Location of Event' identifier = "event-location"  setValue={setLocation}/>
                        <InputWithLabel type="date" labelText='Date of Event' identifier = "event-date"  setValue={setDate}/>
                        <Button type="submit" variant="primary" style={{marginTop: '10px'}} block>Create Job</Button>
                    </form>
            </PopUp>
    )
}

export default JobForm
