import {useState} from "react";

function PopUp(props) {
    const [isResponse,setResponse]= useState(null);
    if (!props.selectedID) {
      return <div />;
    }
    return (
      <div
        style={{
          width: "320px",
          height:"auto",
          backgroundColor: "white",
          position: "absolute",
          top: "10px",
          right: "20px",
          paddingTop: "10px",
          paddingLeft: "20px",
          paddingBottom: "5px"
        }}
      >
        <div>
          <span>Common Name: <b>{props.selectedClass}</b></span>
        </div>
        <div>
          <span>Selected ID: <em>{props.selectedID}</em></span>
        </div>
        <div>
          <span><b>Latitude: </b>{props.latitude}</span>
        </div>
        <div>
          <span><b>Longitude: </b>{props.longitude}</span>
        </div>
        <div>
          <span><b>Altitude: </b>{props.altitude}</span>
        </div>
      </div>
    );
  }
  
  export default PopUp;
  