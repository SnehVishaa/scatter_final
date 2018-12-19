let csvToJson = require('convert-csv-to-json');
var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const emp_Path= 'emp.csv'
const dept_Path= 'dept.csv'
const pos_Path= 'pos.csv'
const EPD_Path= 'e_pd.csv'
const PD_Path= 'pd.csv'
const S_PD_Path= 's_pd.csv'

empJson = {};
deptJson = {};
posJson = {};
EPDJson = {};
PDJson = {};
SPDJson = {};

function getJson(path) {
let outjson = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
console.log(outjson)
return outjson
}

empJson = getJson(emp_Path)
deptJson = getJson(dept_Path)
posJson = getJson(pos_Path)
EPDJson = getJson(EPD_Path)
PDJson = getJson(PD_Path)
SPDJson = getJson(S_PD_Path)


for( i = 0 ; i < 4 ; i++)
{
    console.log(empJson[i])
    console.log(deptJson[i])
    console.log(posJson[i])
    console.log(EPDJson[i])
    console.log(PDJson[i])
    console.log(SPDJson[i])
}

var data=[{
          values:[],
            }];


  var dataV = {};
  //here:
for (var i = 0 ; i < EPDJson.length  ; i++) {

    
  for(var j =  0 ; j < SPDJson.length ; j++) {
      if(EPDJson[i].DP_ID === SPDJson[j].dept_pos_id) {          

        var emp = EPDJson[i].E_ID
        dataV.eid = emp;
        dataV.height = empJson[i].height

        var dp = SPDJson[j].dept_pos_id
   for(  k = 0 ; k < empJson.length ; k++) {

      //    if(empJson[i].id != emp) {
     //      break here; 
     //}
     //else {

      if(empJson[i].id == emp) {
        
        for (var l = 0 ; l < PDJson.length ; l++) {
            
          if(PDJson[l].dept_pos_id == dp) {
            var d = PDJson[l].dept_id
            dataV.did = d;
            var sal = SPDJson[l].salary
            dataV.salary = sal
            data[0].values.push(dataV)
           }
          }
        }
      }
    }

  }
    
}  
console.log(data)

app.get('/', function(req, res, next) {
  res.send(data);
});

var port = 5004;
app.listen(port, () =>
    console.log("Server started on port  "+port)
);
        