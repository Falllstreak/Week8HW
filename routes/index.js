let express = require('express');
let router = express.Router();

// FILE MANAGER
let fs = require("fs");

let fileManager  = {
  read: function() {
    if(fileManager.validData()){
      let rawdata = fs.readFileSync('objectdata.json');
      let goodData = JSON.parse(rawdata);
      serverHikeArray = goodData;
    }
  },

  write: function() {
    let data = JSON.stringify(serverHikeArray);
    fs.writeFileSync('objectdata.json', data);
  },

  validData: function() {
    let rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if(rawdata.length < 1) {
      return false;
    }
    else {
      return true;
    }
  }
};
// FILE MANAGER

let serverHikeArray = [];

let HikeObject = function(pTrail, pWhere, pWhen, pTOD, pDistance, pElevation, pTime, pNotes) {  
  this.trailname = pTrail;
  this.where = pWhere;
  this.when = pWhen;
  this.timeofday = pTOD;
  this.distance = pDistance;
  this.elevation = pElevation;
  this.time = pTime;
  this.note = pNotes;
  this.ID = Math.random().toString(16).slice(5)
}

if(!fileManager.validData()) {

  serverHikeArray.push(new HikeObject("Hike Mountain", "Washington", "2023-05-01", "Evening", "8 Miles", "345 Feet", "3 hours", "This felt so much longer than it was."));
  serverHikeArray.push(new HikeObject("Hike Hill", "Colorado", "2020-08-22", "Morning", "12 Miles", "570 Feet", "6 hours", "I don't recommend mornings for this one."));
  serverHikeArray.push(new HikeObject("Hike View", "Oregon", "2018-07-09", "Night", "3 Miles", "200 Feet", "1 hours", "Easiest hike ever!"));
  fileManager.write();
} else{
  fileManager.read();
}


router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


router.get('/getHikes', function(req, res) {
  fileManager.read();
  res.status(200).json(serverHikeArray);
});

router.post('/addHikes', function(req, res){
  const newHike = req.body;
  serverHikeArray.push(newHike);
  fileManager.write();
  res.status(200).json(newHike);
});

module.exports = router;