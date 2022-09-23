import React, {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import LocationCreate from "./locationCreate"
import sampleLocations from "../Utilities/sampleLocations"
import "./locations.css"
import LocationEdit from "./locationEdit";
import SingleLocation from "./singleLocation";


export default function Locations() {

    const [locations, setLocations] = useState(sampleLocations);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editId, setEditId] = useState();

    //Control when useEffect will be invoked
    const [effectTrigger, setEffectTrigger] = useState(false);

    //Read Functionality
    const getLocations = () => {
        axios.get('http://localhost:3500/Locations').then(response => {
             setLocations(response.data)
        })
    };

    //Create Functionality
    const addLocation = (location) => {
        console.log(location);
        try {
            axios.post('http://localhost:3500/Locations', location).then(response => {
                let updatedLocations = locations;
                updatedLocations.push(response.data);
                setLocations(updatedLocations);
                setEffectTrigger(!effectTrigger);
                setShowCreateForm(false);
            })
        } catch (err) {
            console.log(err)
        }
    };

    //Delete Functionality
    const deleteLocation = (location) => {
        axios.delete(`http://localhost:3500/Locations/${location.id}`).then(() => {
            setEffectTrigger(!effectTrigger);
        })
        window.location.reload(true); //Added to refresh from the db.json server.
    }

    useEffect(() => {
        getLocations();

    }, [effectTrigger]);

    return(
        <section>
            <div className="locations">
                <Card>
                    <Button className="addBtn" onClick={() => setShowCreateForm(!showCreateForm)}>Add New</Button>
                </Card>
                    {locations.map(x => 
                        <Card key={x.id}>
                            <Button onClick={() => setEditId(x.id)} className="locationButtons btn-light">
                                <SingleLocation
                                    key={x.id} 
                                    locale={x} 
                                /> 
                            </Button>
                        </Card>
                    )}
            </div>
            <div className="createForm">
                {showCreateForm &&
                    <LocationCreate 
                        locale={locations}
                        addLocation={addLocation} 
                    />
                }
                {editId !== undefined &&
                    <LocationEdit
                        key={editId}
                        location={locations.find(location => location.id === editId)} 
                        setEditId={setEditId} 
                    />
                }
            </div>
        </section>
    )

}
