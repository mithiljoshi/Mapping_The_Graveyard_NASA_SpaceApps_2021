import { useEffect, useRef, useState } from "react";
import SelectDebris from "./check_box_item";
import * as WorldWind from "worldwindjs";
import Plotter from "./plotter";
import idData from "./id";
import TLE from "./tle";
import getPosition from "./positioning";
import OrbitCalculation from "./orbitCalculation";
import useInterval from "react-useinterval";
import moment from 'moment';
import PopUp from "./popup";
import PredictComponent from "./predict";
//moment(Date);

function MainApp(props) {
  const [time, setTime] = useState(new Date());
  const windowRef = useRef(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [highlighted, setHighlighted] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const placemarkRef = useRef(null);
  const orbitRef = useRef(null);
  const [popUpLatitude,setPopUpLatitude]=useState(null);
  const [popUpLongitude,setPopUpLongitude]=useState(null);
  const [popUpAltitude,setPopUpAltitude]=useState(null);
  useInterval(() => {
    var newDate=new Date();
    setTime(newDate);
  }, 950);
  useEffect(() => {
    console.log(selectedID);
    if (selectedID !== null) {
      //console.log("If");
      orbitRef.current.removeAllRenderables();
      var placemarks = OrbitCalculation(selectedID, time);
      orbitRef.current.addRenderable(placemarks);
      windowRef.current.redraw();
      return;
    }
  }, [selectedID]);
  useEffect(() => {
    //first remove all place marks
    if (isLoaded) {
      setSelectedID(null);
      placemarkRef.current.removeAllRenderables();
      orbitRef.current.removeAllRenderables();
      if (!selectedClass) {
        windowRef.current.redraw();
        return;
      }
      if (selectedClass !== null) {
        var idList = idData[selectedClass];
        var currentSelectedID = window.sessionStorage.getItem("selectedID");
        sessionStorage.removeItem("selectedID");
        if (idList.includes(currentSelectedID)) {
          setSelectedID(currentSelectedID);
        }
        var a = [];
        for (var i = 0; i < idList.length; i++) {
          var line1 = TLE[idList[i]]["line1"];
          var line2 = TLE[idList[i]]["line2"];
          var id = idList[i];
          var position = getPosition(time, line1, line2);
          var point = Plotter(
            position.latitude,
            position.longitude,
            position.altitude,
            id
          );
          a.push(point);
        }
        placemarkRef.current.addRenderables(a);
        windowRef.current.redraw();
      }
    }
  }, [selectedClass]);
  function showList() {
    if (!isLoaded) {
      return <div />;
    }
    var list = Object.keys(idData);
    return list.map((e) => (
      <SelectDebris
        name={e}
        updateSelected={setSelectedClass}
        selected={selectedClass}
        key={e}
      />
    ));
  }
  useEffect(() => {
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
    var wwd = new WorldWind.WorldWindow("canvasOne");
    var layers = [
      // Imagery layers.
      { layer: new WorldWind.BMNGLayer(), enabled: true },
      { layer: new WorldWind.BMNGLandsatLayer(), enabled: true },
      { layer: new WorldWind.BingAerialLayer(null), enabled: false },
      { layer: new WorldWind.BingRoadsLayer(null), enabled: false },
      { layer: new WorldWind.OpenStreetMapImageLayer(null), enabled: false },
      { layer: new WorldWind.AtmosphereLayer(), enabled: true },
      { layer: new WorldWind.CompassLayer(), enabled: true },
      { layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true },
      { layer: new WorldWind.ViewControlsLayer(wwd), enabled: true },
    ];
    for (var l = 0; l < layers.length; l++) {
      layers[l].layer.enabled = layers[l].enabled;
      wwd.addLayer(layers[l].layer);
    }
    wwd.navigator.lookAtLocation.latitude = 19.07;
    wwd.navigator.lookAtLocation.longitude = 72.05;
    wwd.navigator.lookAtLocation.altitude = 10e6;
    windowRef.current = wwd;
    var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
    var orbitLayer = new WorldWind.RenderableLayer("Orbit");
    placemarkRef.current = placemarkLayer;
    orbitRef.current = orbitLayer;
    setLoaded(true);
    wwd.addLayer(placemarkLayer);
    wwd.addLayer(orbitLayer);
    var currentSelectedClass = sessionStorage.getItem("selectedClass");
    sessionStorage.removeItem("selectedClass");
    setSelectedClass(currentSelectedClass);
    new WorldWind.ClickRecognizer(windowRef.current, (recognizer) => {
      var x = recognizer.clientX;
      var y = recognizer.clientY;
      var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
      orbitRef.current.removeAllRenderables();
      if (!pickList?.objects[0]?.userObject?.attributes?.id) {
        for (var i = 0; i < highlighted.length; i++) {
          highlighted[i].highlighted = false;
          setSelectedID(null);
        }
        wwd.redraw();
        return;
      }
      for (var i = 0; i < highlighted.length; i++) {
        highlighted[i].highlighted = false;
        setSelectedID(null);
      }
      setHighlighted([]);
      var redrawRequired = highlighted.length > 0;
      if (pickList.objects.length > 0) {
        redrawRequired = true;
      }
      if (pickList.objects.length > 0 && !pickList.objects[0].isTerrain) {
        console.log(pickList.objects[0].userObject.attributes.id);
        pickList.objects[0].userObject.highlighted = true;
        setSelectedID(pickList.objects[0].userObject.attributes.id);
        highlighted.push(pickList.objects[0].userObject);
      }
      if(!(pickList.objects.length > 0 && !pickList.objects[0].isTerrain)){
        setSelectedID(null);
      }
      if (redrawRequired) {
        wwd.redraw();
      }
    });
  }, []);
  useInterval(() => {
    if (isLoaded) {
      placemarkRef.current.removeAllRenderables();
      if (selectedClass !== null) {
        var name = selectedClass.split(" ");
        for (var j = 0; j < name.length; j++) {
          name[j] = name[j].toLowerCase();
        }
        var s = "";
        for (j = 0; j < name.length; j++) {
          s += name[j];
        }
        fetch(
          "http://localhost:3000/" +
            s +
            "/" +
            time.getFullYear().toString() +
            "/" +
            time.getMonth().toString() +
            "/" +
            time.getDate().toString() +
            "/" +
            time.getHours().toString() +
            "/" +
            time.getMinutes().toString() +
            "/" +
            time.getSeconds().toString()
        )
          .then(async (res) => {
            var data = await res.json();
            var list = data.data;
            var ans = [];
            for (var i = 0; i < list.length; i++) {
              var point = Plotter(
                list[i]["latitude"],
                list[i]["longitude"],
                list[i]["altitude"] * 1000,
                list[i]["id"]
              );
              if(list[i]["id"]===selectedID){
                setPopUpAltitude(list[i]["altitude"])
                setPopUpLatitude(list[i]["latitude"])
                setPopUpLongitude(list[i]["longitude"]);
              }
              ans.push(point);
            }
            placemarkRef.current.addRenderables(ans);
            console.log("Hi");
            windowRef.current.redraw();
          })
          .catch((err) => console.log(err));
      }
    }
    //get new position from date
    //remove all marks
    //put new position
  }, 3000);
  useInterval(() => {
    if (selectedClass) {
      window.sessionStorage.setItem("selectedClass", selectedClass);
      if (selectedID) {
        window.sessionStorage.setItem("selectedID", selectedID);
      }
    }
    window.location.reload(true);
  }, 4 * 60 * 1000);
  return (
    <div>
      <PopUp selectedClass={selectedClass} selectedID={selectedID} latitude={popUpLatitude} longitude={popUpLongitude} altitude={popUpAltitude}/>
      <PredictComponent selectedClass={selectedClass} selectedID={selectedID}/>
      <div style={{ display: "flex", width: "auto" }}>
        <div
          style={{
            height: "100vh",
            width: "20%",
            backgroundColor: "white",
            borderStyle: "solid",
            borderRightColor: "gray",
            borderRightWidth: "2px",
            borderBottomStyle: "none",
            borderTopStyle: "none",
            borderLeftStyle: "none",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          onChange={(e) => console.log(e.target.value)}
        >
          {showList()}
        </div>
        <div style={{ height: "100vh", width: "80%" }}>
          <canvas
            style={{
              height: "90vh",
              width: "100%",
              backgroundImage: "url(./background.jpeg)",
            }}
            id="canvasOne"
          ></canvas>
          <div
            style={{
              height: "10vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                {moment(time).format("DD/MM/YYYY")+"  "}                
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "23px",
                }}
              >
                {(time.getHours().toString().length === 1 ? "0" : "") +
                  time.getHours() +
                  ":" +
                  (time.getMinutes().toString().length === 1 ? "0" : "") +
                  time.getMinutes() +
                  ":" +
                  (time.getSeconds().toString().length === 1 ? "0" : "") +
                  time.getSeconds()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
