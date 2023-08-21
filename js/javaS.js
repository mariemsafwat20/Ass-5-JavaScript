let searchInput = document.querySelector("#search");
let findLocation = document.querySelector("#submit");

// current Day
let currentDay = document.querySelector(".currentDay");
let currentDate = document.querySelector(".currentDate");
let searchLocation = document.querySelector(".location");
let degreeDay1 = document.querySelector(".num");
let icon = document.querySelector(".icon");

// Day1
let Day1 = document.querySelector(".Day1");
let icon1 = document.querySelector(".icon1");
let maxDegree1 = document.querySelector(".maxDegree1");
let minDegree1 = document.querySelector(".minDegree1");
let custom1 = document.querySelector(".custom1");

// Day2
let Day2 = document.querySelector(".Day2");
let icon2 = document.querySelector(".icon2");
let maxDegree2 = document.querySelector(".maxDegree2");
let minDegree2 = document.querySelector(".minDegree2");
let custom2 = document.querySelector(".custom2");

let data ="";
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayName =""
let Months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
let date = "";
let userPosition="";

function position() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
async function showPosition(position) {
  userPosition = position.coords.latitude + "," + position.coords.longitude;    
  let data = await getData(userPosition);
  displayData(data)
}
position();

async function getData(q="cairo"){
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fac7f0eb9c7b41e6b45121220232008&q=${q}&days=3`);
    let data = await req.json()
    return data;
}

searchInput.addEventListener("keyup", async function(){
  if(searchInput.value.length >= 3){
    data = await getData(searchInput.value.toLowerCase());
    displayData(data);
  }else{
    console.log("Please Enter 3 chars of country")
  }
})

function displayData(data){
  // current Day
  searchLocation.innerHTML = data.location.name;
  degreeDay1.innerHTML = data.current.temp_c  + `<span>o</span>C`;
  icon.setAttribute("src", "https:" + data.current.condition.icon);
  
  //the name of current day
  var d = new Date(data.current.last_updated);
  dayName = days[d.getDay()];
  currentDay.innerHTML = dayName;
  
  //the date of current day
  let dayNumber = d.getDate();
  let MonthName = Months[d.getMonth()];
  date = dayNumber + MonthName;
  currentDate.innerHTML = date;
  
  //Day 1
  icon1.setAttribute("src", "https:" + data.forecast.forecastday[1].day.condition.icon);
  maxDegree1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + `<span>o</span>C`;
  minDegree1.innerHTML = data.forecast.forecastday[1].day.mintemp_c + `<span>o</span>`;
  custom1.innerHTML = data.forecast.forecastday[1].day.condition.text;
  
  //the name of Day1
  var d = new Date(data.forecast.forecastday[1].date);
  dayName = days[d.getDay()];
  Day1.innerHTML = dayName;
 
  // day 2
  icon2.setAttribute("src", "https:" + data.forecast.forecastday[2].day.condition.icon);
  maxDegree2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + `<span>o</span>C`;
  minDegree2.innerHTML = data.forecast.forecastday[2].day.mintemp_c + `<span>o</span>`;
  custom2.innerHTML = data.forecast.forecastday[2].day.condition.text;
  
  //the name of Day2
  var d = new Date(data.forecast.forecastday[2].date);
  dayName = days[d.getDay()];
  Day2.innerHTML = dayName;
}

