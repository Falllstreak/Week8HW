let HikeArray = [];

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

HikeArray.push(new HikeObject("Hike Mountain", "Washington", "2023-05-01", "Evening", "8 Miles", "345 Feet", "3 hours", "This felt so much longer than it was."));
HikeArray.push(new HikeObject("Hike Hill", "Colorado", "2020-08-22", "Morning", "12 Miles", "570 Feet", "6 hours", "I don't recommend mornings for this one."));
HikeArray.push(new HikeObject("Hike View", "Oregon", "2018-07-09", "Night", "3 Miles", "200 Feet", "1 hours", "Easiest hike ever!"));

let selectedTOD = "";

// code runs immediately
//================================================================

// runs  when dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {

  createList();

  document.getElementById("buttonAdd").addEventListener("click", function() {
    HikeArray.push(new HikeObject(
      document.getElementById("trailInput").value,
      document.getElementById("locationInput").value,
      document.getElementById("dateInput").value,
      selectedTOD,
      document.getElementById("distanceInput").value,
      document.getElementById("trailElevation").value,
      document.getElementById("trailTime").value,
      document.getElementById("noteInput").value));
    
    document.location.href = "index.html#listHikes";
  });

  $(document).bind("change", "#select-TOD", function(event, ui) {
    selectedTOD = $('#select-TOD').val();
  });

  $(document).on("pagebeforeshow", "#listHikes", function(event) { // have to use jQuery 
    createList();
  });

      // need one for our hikeBreakdown page to fill in the info based on the passed in ID
      $(document).on("pagebeforeshow", "#hikeBreakdown", function (event) {   
        let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
        // next step to avoid bug in jQuery Mobile,  force the movie array to be current
        
        
        
        HikeArray = JSON.parse(localStorage.getItem('HikeArray'));  
        console.log(HikeArray);
        let pointer = GetArrayPointer(localID) // map to which array element it is
        


      
        document.getElementById("breakdownTitle").innerHTML = HikeArray[pointer].trailname + " Details:";

        document.getElementById("oneTrail").innerHTML = "Trail Name: " + HikeArray[pointer].trailname;
        document.getElementById("oneLocation").innerHTML = "Location: " + HikeArray[pointer].where;
        document.getElementById("oneDate").innerHTML = "Date: " + HikeArray[pointer].when;
        document.getElementById("oneTOD").innerHTML = "Time of Day: " + HikeArray[pointer].timeofday;
        document.getElementById("oneDistance").innerHTML = "Distance Traveled: " + HikeArray[pointer].distance;
        document.getElementById("oneElevation").innerHTML = "Average Trail Elevation: " + HikeArray[pointer].elevation;
        document.getElementById("oneTime").innerHTML = "Time to complete: " + HikeArray[pointer].time;
        document.getElementById("oneNote").innerHTML = "Your Notes: " + HikeArray[pointer].note;
    });
 
// end of page before show code *************************************************************************
  });

//======================================
// function defintions
function createList() {
  // clear prior data
  let myul = document.getElementById("hikeListul");
  myul.innerHTML = "";

  HikeArray.forEach(function (oneHike,) { // use handy array forEach method
    let myLi = document.createElement('li');
    myLi.classList.add('oneHike');
    myLi.setAttribute("data-parm", oneHike.ID);
    myLi.innerHTML = oneHike.trailname + " -    [" + oneHike.when + "]    ";
    myul.appendChild(myLi);
  });



    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    let liList = document.getElementsByClassName("oneHike");
    let newHikeArray = Array.from(liList);
    newHikeArray.forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            let parm = this.getAttribute("data-parm");  // passing in the record.Id           
            localStorage.setItem('parm', parm);
            // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
            // current movie array and save it to localStorage as well.
            let stringHikeArray = JSON.stringify(HikeArray); // convert array to "string"
            localStorage.setItem('HikeArray', stringHikeArray);
            // now jump to our page that will use that one item
            document.location.href = "index.html#hikeBreakdown";
            });
        });
      };


        function GetArrayPointer(localID) {
          for (let i = 0; i < HikeArray.length; i++) {
              if (localID === HikeArray[i].ID) {
                  return i;
              }
          }
      }