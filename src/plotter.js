//returns graphic to be rendered
import * as WorldWind from "worldwindjs";

function Plotter(x,y,z,id){
    var canvas=document.createElement("canvas");
    canvas.setAttribute("id",id)
    var context=canvas.getContext("2d");
    var size=9;
    canvas.width=size;
    canvas.height=size;
    context.arc(5,5,5, 0, 2 * Math.PI, false);
    context.fillStyle="gray";
    context.fill();
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
    placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
    placemarkAttributes.imageScale = 1;
    placemarkAttributes.id=id;
    placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
    highlightAttributes.imageScale = 1.2;
    var placemarkPosition = new WorldWind.Position(x,y,z);
    var placemark = new WorldWind.Placemark(placemarkPosition, false, placemarkAttributes);
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    placemark.highlightAttributes = highlightAttributes;
    return placemark;
}

export default Plotter