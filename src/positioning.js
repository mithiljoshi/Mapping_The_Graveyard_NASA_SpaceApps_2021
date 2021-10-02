import * as Satellite from "satellite.js";

function getPosition(time,line1,line2){
    var satrec = Satellite.twoline2satrec(line1,line2);
    var positionAndVelocity = Satellite.propagate(satrec,time);
    var positionEci = positionAndVelocity.position;
    var gmst = Satellite.gstime(time);
    var positionGd = Satellite.eciToGeodetic(positionEci, gmst);
    var longitude = positionGd.longitude,
    latitude  = positionGd.latitude,
    height    = positionGd.height;
    var longitudeDeg = Satellite.degreesLong(longitude),
    latitudeDeg  = Satellite.degreesLat(latitude);
    return {
        "latitude":latitudeDeg,
        "longitude":longitudeDeg,
        "altitude":height*1000
    }
}

export default getPosition