const API_keys = "a1150bdee3f4d05aea0577e821cf36d4";
const COORDS = 'coords';

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weatherPt");

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_keys}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const icon = json.weather[0].icon;
        getIcon(icon);
        const temparture = json.main.temp;
        weather.innerText = `현재온도 : ${temparture}℃`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    const icon = getWeather(latitude, longitude);
    return icon
}
function handleGeoError(position){
    console.log("can't access to geo");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function getIcon(icon){
    const link = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const image = new Image;
    image.src = link;
    weatherIcon.appendChild(image);
}

function init(){
    const icon = loadCoords();
}

init();

document.onload = function(){
    console.log("done?")
    getIcon(id);
}
