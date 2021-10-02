const fs=require("fs");
const data = fs.readFileSync('./Debris.txt', {encoding:'utf8', flag:'r'});
const splitData=data.split("\n");
const refined=splitData.slice(0,splitData.length-1);
var length=(refined.length/3).toFixed();

var a={}
for(var i=0;i<length;i++){
    var id=refined[3*i+1].slice(2,8);
    var commonName=refined[3*i];
    var line1=refined[3*i+1];
    var line2=refined[3*i+2];
    a[id]={}
    a[id]["line1"]=line1;
    a[id]["commonName"]=commonName;
    a[id]["line2"]=line2;
}

var b=JSON.stringify(a);
fs.writeFileSync("./file.json",b);

const clean=fs.readFileSync("./file.json");
const parsedData=JSON.parse(clean);

const keys=Object.keys(parsedData);

for(var i=0;i<keys.length;i++){
    parsedData[keys[i]]["line1"].replace("\r",'')
    parsedData[keys[i]]["line2"].replace("\r",'')
    parsedData[keys[i]]["commonName"].replace("\r",'');
}

fs.writeFileSync("./tle.json",JSON.stringify(parsedData));

