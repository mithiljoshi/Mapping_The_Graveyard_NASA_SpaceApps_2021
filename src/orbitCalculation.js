import TLE from "./tle.js";
import * as WorldWind from "worldwindjs";
import getPosition from "./positioning.js";

function OrbitCalculation(id, time) {
  var line1 = TLE[id]["line1"];
  var line2 = TLE[id]["line2"];
  var t1 = time;
  var count = 0;
  var positions = [];
  while (count < 11) {
    var position = getPosition(t1, line1, line2);
    positions.push(
      new WorldWind.Position(
        position.latitude,
        position.longitude,
        position.altitude
      )
    );
    t1.setSeconds(t1.getSeconds() + 600);
    count++;
  }
  var path = new WorldWind.Path(positions, null);
  path.altitudeMode = WorldWind.RELATIVE_TO_GROUND; // The path's altitude stays relative to the terrain's altitude.
  path.followTerrain = true;
  path.extrude = true; // Make it a curtain. // Use a surface shape in 2D mode.

  // Create and assign the path's attributes.
  var pathAttributes = new WorldWind.ShapeAttributes(null);
  pathAttributes.outlineColor = WorldWind.Color.GREEN;
  pathAttributes.interiorColor = new WorldWind.Color(0,0,0,0); //Draw verticals only when extruding.
  path.attributes = pathAttributes;
  return path;
}

export default OrbitCalculation;
