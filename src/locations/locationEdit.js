import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";
import "./locations.css";
import Locations from "./locations";

export default function LocationEdit(props)  {

    //Hooks For Edit.
    const [name, setName] = useState(props.location.LocationName)
    const [lat, setLat] = useState(props.location.Latitude)
    const [long, setLong] = useState(props.location.Longitude)
    const [online, setOnline] = useState(props.location.Online)

    //Hooks For validation.
    const [valSummary, setValSummary] = useState('');
    const[nameVal, setNameVal] = useState('');

    // Local function to validate string length.
    const validate = (location) => {
        let name = location.LocationName

        name.length > 30 ? setNameVal('**Max 30 characters.') : setNameVal('');
    }

    // Custom submission handler.
    const handleSubmit = (e) => {
    e.preventDefault();
        
        const location = {
            LocationName: name,
            Latitude: lat,
            Longitude: long,
            Online: e.target.online.checked,
            id: props.location.id
        }

        validate(location);
        if(nameVal === ''){
            axios.put(`http://localhost:3500/Locations/${location.id}`, location).then(response => {
                console.log(response);
            });
        }
        else {
            setValSummary('***Correct the inputs below to sbmit the new location.')
        }
        window.location.reload(true); //Added to refresh from the db.json server.
    };

    //Cancel Button
    const cancelButton = () => {
        window.location.reload(true); //Added to refresh from the db.json server.
    }

    return(
        <article className="createBorder">
            <Card>
                <form onSubmit={(e) => {
                    handleSubmit(e); 
                    props.setEditId();
                    }}
                >
                    <p className="locInfo">Edit Location</p>
                    <Card.Body>
                        {valSummary !== '' && 
                        <div className='alert alert-danger'>
                            <strong>{valSummary}</strong>
                        </div>}
                        <div className="fieldContainer">
                        <label className="createFields">Name: <input defaultValue={props.location.LocationName} className="createBox" type="text" name="name" onChange={(e) => setName(e.target.value)} required /></label>
                        <br />
                        <label className="createFields">Latitude: <input defaultValue={props.location.Latitude} className="createBox" type="decimal" name="latitude" onChange={(e) => setLat(e.target.value)} required /></label>
                        <br />
                        <label className="createFields">Longitude: <input defaultValue={props.location.Longitude} className="createBox" type="decimal" name="longitude" onChange={(e) => setLong(e.target.value)} required /></label>
                        <br />
                        <input type="checkbox" onChange={() => setOnline(!online)} checked={online ? "checked" : ""} className="createFields" name="online" /><label className="checkLabel"> Online</label>
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

