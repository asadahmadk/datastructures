// npm install axios
// mkdir data

const fs = require('fs');

const axios = require('axios');

axios
  .get('https://parsons.nyc/aa/m08.html')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    fs.writeFileSync('/home/ec2-user/environment/DataStructures/data/m08.txt', res.data);
  })
  .catch(error => {
    console.error(error);
  });
 
 //npm install cheerio

//var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var meeting = [];
var meetingfd = [];
var meetingdetails = [];
var meetings = [];

$('tr').each(function(i, element) {
    if ($(element).attr("style")=="margin-bottom:10px") {
        let row = ($(element).html());
        console.log('*************');
  //Make a loop to extract data from the raw data
   meetings.forEach(function(meeting){
  const meetingfdName = meeting.split(';">')[1];
  //const meetingfdTag= meeting.split('\t\t\t\t  \t    <b>')[1].split('</b><br />')[0]
  const meetingfdWheelChair = meeting.includes('Wheelchair Access');
  const meetingfdlocation = meeting.split('\t\t\t\t\t\t')[1];
  const meetingfdnearby = meeting.split('\t\t\t\t\t\t<br />')[1];
  const meetingfdzip = meeting.split('\t\t\t\t\t\t<br />')[1];
  //const meetingfdtime = meeting.split('\t\t\t\t  \t    <b>');
  const meetingfdDetails=[];

//a loop to get the time
  meetingdetails.forEach(function parseDetails (p) {
// splitting time array on the basis of spacing
let q = p[1].split(' ');
  meetingfdDetails.push({
    day:p[0],
    startTime: p[3] +p[4],
    endTime: p[6] + p[7],
    meetingType: p[11]});
}); 
//Final Array in the result
  meetingfd.push({
    name: meetingfdName,
    location: {meetingfdlocation,
               meetingfdnearby,
               //tag: meetingfdTag,
               zip: meetingfdzip},
    wheelchairaccess:meetingfdWheelChair,
    time: meetingfdDetails
  
});

});
        
  
  return console.log(meeting);
} //console.log(tr1);
        
  
}
);
