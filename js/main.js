let todayName = document.getElementById("today_day_name");
let todayNumber = document.getElementById("today_day_number");
let todayMonth = document.getElementById("today_month");
let todayLocation = document.getElementById("today_location");
let todaytemp = document.getElementById("today_temp");
let todayConditionImg = document.getElementById("today_condition_img");
let todayConditionText= document.getElementById("today_condition_text");
let humitidy = document.getElementById("humitidy");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind_direction");


//next

let nextDay = document.getElementsByClassName("day");
let nextImg = document.getElementsByClassName("next_img");
let nextMaxTemp = document.getElementsByClassName("degree");
let nextMinTemp = document.getElementsByClassName("next_min");
let custom = document.getElementsByClassName("custom");

//search

let searchInput = document.getElementById("search");


//fetch api


async function getWeatherData(cityName)
{
 
   let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=98e9266e3b1c460c989172049242601&q=${cityName}&days=3`);
   let weatherData = await weatherResponse.json()
   return weatherData
}

getWeatherData();


// display today data
 function displayTodayData(data){
    let todayDate =new Date();
    todayNumber.innerHTML=todayDate.getDate();
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name;
    todaytemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src" , data.current.condition.icon);
    todayConditionText.innerHTML =  data.current.condition.text ; 
    humitidy.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+"km/h";
    windDirection.innerHTML = data.current.wind_dir;
 }


// display next days data
function displayNextDayData(data){
 let forecastData = data.forecast.forecastday 
 for(let i=0 ; i<2 ; i++){
    let nextDate=new Date(forecastData[i+1].date );
    nextDay[i].innerHTML=nextDate.toLocaleDateString("en-US",{weekday:"long"});
    nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c;
    nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c; 
    nextImg[i].setAttribute ("src" , forecastData[i+1].day.condition.icon);
    custom[i].innerHTML=forecastData[i+1].day.condition.text; 
 }
}

// start app

async function startApp (city="cairo"){
 let weatherData = await getWeatherData(city);  
 if(!weatherData.error) {
    displayTodayData(weatherData)
displayNextDayData(weatherData)
 }

}



searchInput.addEventListener("input" , function(){
    startApp(searchInput.value);
})