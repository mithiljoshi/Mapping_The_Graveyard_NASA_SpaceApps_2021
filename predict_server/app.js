const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors())
app.use(express.json())
const jsPredict=require("jspredict");
const TLE=require("./tle.js");

app.post("/predict",(req,res)=>{
    const body=req.body;
    const id=body.id;
    console.log(id);
    const line1=TLE[id]["line1"];
    const line2=TLE[id]["line2"];
    const commonName=TLE[id]["commonName"]
    const twoLine=commonName+"\n"+line1+"\n"+line2
    const latitude=body.latitude;
    const longitude=body.longitude;
    const q=[latitude,longitude,0];
    const a=new Date();
    const milliSeconds=a.getTime();
    const prediction=jsPredict.transits(twoLine,q,milliSeconds,milliSeconds+31536000000*10,0,1);
    res.json({transits:prediction});
})

app.listen(8000,()=>console.log("App running on port 8000"))