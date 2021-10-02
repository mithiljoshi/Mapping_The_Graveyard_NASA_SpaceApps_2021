import { useState } from "react";
import moment from 'moment';


function PredictComponent(props) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isResponse, setResponse] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elevation, setElevation] = useState(null);
  const [duration, setDuration] = useState(null);
  if (!props.selectedClass || !props.selectedID) {
    return <div />;
  }
  function buttonClick() {
    setResponse(null);
    setElevation(null);
    setStartTime(null);
    setDuration(null);
    fetch("http://localhost:8000/predict", {
      method: "POST",
      body: JSON.stringify({
        id: props.selectedID,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(async (res) => {
        var data=await res.json();
        var transits=data.transits;
        if(transits.length===0){
            setResponse(true);
            setStartTime(null);
        }
        else{
            setResponse(true);
            var date=new Date(transits[0].start);
            setStartTime(moment(date).format("DD-MM-YYYY HH:mm:ss"));
            setDuration((transits[0].duration/1000).toFixed(3))
            setElevation((transits[0].maxElevation)?.toFixed(3))
            console.log(transits[0])
        }
      })
      .catch((e) => {console.log(e)});
  }
  function result() {
    if (!isResponse) {
      return <div />;
    } else {
      if (!startTime) {
        return (
          <div
            style={{
              marginTop: "20px",
              width: "320px",
              display: "flex",
              justifyContent: "center",
              marginRight: "10px",
              color: "red",
              marginBottom: "10px",
            }}
          >
            No likely passes
          </div>
        );
      }
      return (
        <>
          <div
            style={{
              marginTop: "30px",
              width: "320px",
              display: "flex",
              justifyContent: "start",
              marginRight: "10px",
            }}
          >
            <span>
              Start: <b>{startTime}</b>
            </span>
          </div>
          <div style={{ marginTop: "5px" }}>
            <span>
              Duration: <em>{duration}s</em>
            </span>
          </div>
          <div style={{ marginBottom: "10px", marginTop: "5px" }}>
            <span>
              Elevation: <em>{elevation}km</em>
            </span>
          </div>
        </>
      );
    }
  }
  return (
    <div
      style={{
        width: "320px",
        height: "auto",
        backgroundColor: "white",
        position: "absolute",
        top: "120px",
        right: "20px",
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingBottom: "5px",
      }}
    >
      <input
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        style={{ width: "95%" }}
      />
      <input
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        style={{ width: "95%", marginTop: "8px" }}
      />
      <div
        style={{ width: "320px", display: "flex", justifyContent: "center",marginBottom:"3px"}}
      >
        <button
          style={{
            width: "300px",
            marginTop: "18px",
            backgroundColor: "green",
            color: "white",
            boxShadow: "none",
            outline: "none",
            border: "none",
            height: "30px",
            marginRight: "5px",
          }}
          onClick={buttonClick}
        >
          GET PREDICTION
        </button>
      </div>
      {result()}
    </div>
  );
}

export default PredictComponent;
