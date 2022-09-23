import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";
import "./locations.css"

export default function LocationCreate(props) {

    //Hooks For validation.
    const [valSummary, setValSummary] = useState('');
    const[nameVal, setNameVal] = useState('');

        //Cancel Button
    const cancelButton = () => {
         window.location.reload(true); //Added to refresh from the db.json server.
     }

    //Local function to validate string length.
    const validate = (location) => {
        let name = location.LocationName

        name.length > 30 ? setNameVal('**Max 30 characters.') : setNameVal('');
    }

    //Custom submission handler.
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.online.checked)
        const location = {
            LocationName: e.target.name.value,
            Latitude: e.target.latitude.value,
            Longitude: e.target.longitude.value, 
            Online: e.target.online.checked
        }

        validate(location);
        if(nameVal === ''){
            axios.post('http://localhost:3500/Locations', location).then(response => {
                console.log(response);
            });
        }
        else {
            setValSummary('***Correct the inputs below to submit a new location.')
        }
        window.location.reload(true); //Added to refresh from the db.json server.
    }

    return(
        <article className="createBorder">
            <Card>
                <form onSubmit={handleSubmit}>
                    <p className="locInfo">Location Info</p>
                    <Card.Body>
                        {valSummary !== '' && 
                        <div className='alert alert-danger'>
                            <strong>{valSummary}</strong>
                        </div>}
                        <div className="fieldContainer">
                        <label className="createFields">Name: <input className="createBox" type="text" name="name" required /></label>
                        <br />
                        <label className="createFields">Latitude: <input className="createBox" type="decimal" name="latitude" required /></label>
                        <br />
                        <label className="createFields">Longitude: <input className="createBox" type="decimal" name="longitude" required /></label>
                        <br />
                        <input type="checkbox" className="createFields" name="online" /><label className="checkLabel"> Online</label>
                        </div>
                        <br />
                        <div className="createBtns">
                            <Button className="submitBtn" type="submit">Save</Button>
                            <Button className="cancelBtn btn-light" onClick={cancelButton}>Cancel</Button>
                        </div>
                    </Card.Body>
                </form>
            </Card>
        </article>
    )
}

