let express = require('express');
let router = express.Router();

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

serverHikeArray.push(new HikeObject("Hike Mountain", "Washington", "2023-05-01", "Evening", "8 Miles", "345 Feet", "3 hours", "This felt so much longer than it was."));
serverHikeArray.push(new HikeObject("Hike Hill", "Colorado", "2020-08-22", "Morning", "12 Miles", "570 Feet", "6 hours", "I don't recommend mornings for this one."));
serverHikeArray.push(new HikeObject("Hike View", "Oregon", "2018-07-09", "Night", "3 Miles", "200 Feet", "1 hours", "Easiest hike ever!"));



router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});


router.get('/getHikes', function(req, res) {  
  res.status(200).json(serverHikeArray);
});

router.post('/addHikes', function(req, res){
  const newHike = req.body;
  serverHikeArray.push(newHike);
});

module.exports = router;