const express=require("express");
const satellite=require("satellite.js");
const data=require("./id");
const TLE=require("./tle");
const cors=require("cors");
const app=express();
app.use(cors())

app.get("/:id/:year/:month/:date/:hour/:minute/:second",(req,res)=>{
    var id=req.params.id;
    var b="";
    if(id==="cosmos2251"){
        b="COSMOS 2251";
    }
    if(id==="cosmos2251deb"){
        b="COSMOS 2251 DEB"
    }
    if(id==="iridium33"){
        b="IRIDIUM 33"
    }
    if(id==="iridium33deb"){
        b="IRIDIUM 33 DEB"
    }
    if(id==="fengyun1c"){
        b="FENGYUN 1C"
    }
    if(id==="fengyun1cdeb"){
        b="FENGYUN 1C DEB";
    }
    var idList=data[b];
    var returnList=[];
    var time=new Date();
    time.setFullYear(req.params.year)
    time.setMonth(req.params.month);
    time.setDate(req.params.date);
    time.setHours(req.params.hour);
    time.setMinutes(req.params.minute);
    time.setSeconds(req.params.second);
    for(var i=0;i<idList.length;i++){
        a={}
        a["id"]=idList[i];
        var line1=TLE[idList[i]]["line1"];
        var line2=TLE[idList[i]]["line2"];
        var satrec=satellite.twoline2satrec(line1,line2);
        var positionAndVelocity=satellite.propagate(satrec,time);
        var positionEci=positionAndVelocity.position;
        var gmst=satellite.gstime(time);
        var positionGd=satellite.eciToGeodetic(positionEci,gmst);
        var longitude=positionGd.longitude;
        var latitude=positionGd.latitude;
        var height=positionGd.height;
        var longitudeDeg=satellite.degreesLong(longitude);
        var latitudeDeg=satellite.degreesLat(latitude);
        a["latitude"]=latitudeDeg;
        a["longitude"]=longitudeDeg;
        a["altitude"]=height;
        returnList.push({...a})
    }
    res.json({data:returnList})

})

app.listen(3000,()=>console.log("3000"))