import  Card from "react-bootstrap/Card";
import "./locations.css"

export default function SingleLocation(props) {

  //Changes font color depending on if the location is online or offline.
  if(props.locale.Online === true) {
    return (
      <div className="locBorder online">
         <Card.Title>{props.locale.LocationName}</Card.Title>
         <Card.Text>
             {props.locale.Latitude}, {props.locale.Longitude}
         </Card.Text>
       </div>
    )}
  else{
    return (
      <div className="locBorder offline">
         <Card.Title>{props.locale.LocationName}</Card.Title>
         <Card.Text>
             {props.locale.Latitude}, {props.locale.Longitude}
         </Card.Text>
       </div>
    )}



}
