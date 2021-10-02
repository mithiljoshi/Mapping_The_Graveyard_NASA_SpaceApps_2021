const fs=require("fs");

const data=fs.readFileSync("./tle.json");

const parsedData=JSON.parse(data);

const write={}

const length=Object.keys(parsedData).length;
const keys=Object.keys(parsedData);

for(var i=0;i<length;i++){
    var obj=parsedData[keys[i]];
    if(!write[obj["commonName"]]){
        write[obj["commonName"]]=[parsedData[keys[i]]];
    }
    else{
        write[obj["commonName"]].push(parsedData[keys[i]]); 
    }
}

var sub=JSON.stringify(write);

fs.writeFileSync("space.json",sub);