import React from 'react'
import Button from 'react-bootstrap/Button'
import {PopUp} from './PopUpStyles'
import {Input, FlexDirectionRow} from '../GeneralStyles'
import {TextArea} from '../GeneralStyles'

function JobForm({handleSubmit, setDate, setDescription, setPeopleAmount, setLocation, setSummary, cancelPost, setPricePerPerson}) {
    return (
            <PopUp>
                <form onSubmit = {handleSubmit}>
                        <FlexDirectionRow><h3>Create Job</h3></FlexDirectionRow>
                        <Input type="text" placeholder='Event Summary' id = "event-summary" onChange={(e) => setSummary(e.target.value)} style={{marginBottom: '10px'}}/>
                        <TextArea type="text" placeholder='Event Description' id = "event-description" onChange={(e) => setDescription(e.target.value)} height= '100px'/>
                        <Input type="text" placeholder='Amount of People' id = "people-amount" onChange={(e) => setPeopleAmount(e.target.value)}/>
                        <Input type="number" placeholder='Price Per Person' id = "people-per-person"  onChange={(e) => setPricePerPerson(e.target.value)} style={{margin: '5px 0px'}}/>
                        <Input type="text" placeholder='Location of Event' id = "event-location"  onChange={(e) => setLocation(e.target.value)} style={{margin: '5px 0px'}}/>
                        <FlexDirectionRow style={{alignItems: 'center'}}>
                        <label style={{marginRight: '5px'}}>Date: </label>
                        <Input type="date" placeholder='Date of Event' id = "event-date"  onChange={(e) => setDate(e.target.value)} style={{margin: '5px 0px'}}/>
                        </FlexDirectionRow>
                        <Button type="submit" variant="primary" style={{marginTop: '10px'}} block>Create Job</Button>
                    </form>
            </PopUp>
    )
}

export default JobForm
