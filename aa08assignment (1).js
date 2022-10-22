// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

function parseData(data){
  //create meeting list
  const meeting={
    name:"",
    location:"",
    address:"",
    wheelchair:"",
    meetingsDetails: []
  
};

//two proportions of data to be split in left and right
  const left = data.split("</td>")[0];
  const right_arr = data.split("</td>")[1].split('\t\t\t\t  \t    <b>').splice(1);
  
  //for left part
  const location =  left.split('<b>')[0].split('0;">')[1].split('</h4>')[0];
 
  // console.log(left.split('<b>'))
  const address1 = left.split('<b>')[1].split("<br>")[1].replace("\t\t\t\t\t\t",'').trim()
  const address2 = left.split('<b>')[1].split("<br>")[2].replace("\t\t\t\t\t\t",'').trim()
  const address = address1 + address2
  const name = left.split('<b>')[1].split("<br />")[0].replace("</b>").split('<br>')[0].split("-")[0]
  
// compile data
  meeting.name = name;
  meeting.location = location;
  meeting.address = address;
  
//wheelChair option
  if(left.includes('Wheelchair Access')){
    meeting.wheelchair = "yes";
  }else{
    meeting.wheelchair = "not available";
  }
   //get meeting time
  for(let i=0;i<right_arr.length;i++){
    //create a meeting time list
    let meetingTime={
    day: "",
    start: "",
    end:"",
    type:"",
    specialInterest:"",
  };
    
    let item = right_arr[i];
    meetingTime.day = item.split(" ")[0];
    meetingTime.start = item.split('b')[1].replace("> ",'').replace(" <",'');
    meetingTime.end = item.split('b')[3].replace("> ",'').replace(" <",'');
    
    // search special interest
    if(item.includes("Special")) {
      meetingTime.specialInterest = item.split('b')[9].replace(/\t|\n|\v|\r|\f/g,'').replace("> ",'').replace(" <",'');
    } else{
      meetingTime.specialInterest = "none";
    }
    
    // check meeting time
    if(item.includes("Type")){
      meetingTime.type = item.split('b')[6].replace(/\t|\n|\v|\r|\f/g,'').replace("> ",'').replace(" <",'');
    }else{
      meetingTime.type = "none";
    }

    meeting.meetingsDetails.push(meetingTime);
    
  }
  
  return meeting;
}
  
$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
        let row = $(elem).html();
// run my function
        let result = parseData(row); 
        console.log(result);
    }
});

