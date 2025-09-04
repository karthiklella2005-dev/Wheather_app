function display(data){
    let page2 = document.getElementsByClassName("page-2")[0];
    while (page2.firstChild) {
        page2.removeChild(page2.firstChild);
    }
    console.log(data)
    names = ["Longitude","Latitude","Pressure","Humidity","Description","Visibility","Wind Speed","Sun Rise","Sun Set"]
    fetch_names = ["coord.lat","coord.lat","main.pressure","main.humidity","weather.0.description","visibility","wind.speed",]
    var weather_icon = document.getElementById('current_icon');
    weather_icon.src = `http://openweathermap.org/img/wn/${
            data.weather[0].icon
            }@2x.png`
    document.getElementById("current_temp").innerHTML = parseInt(data.main.temp)+" °C"
    createDiv(names[0],data.coord.lon)
    createDiv(names[1],data.coord.lat)
    createDiv(names[2],data.main.pressure + " hPa")
    createDiv(names[3],data.main.humidity + " %")
    createDiv(names[4],data.weather[0].description)
    createDiv(names[5],data.visibility/1000 + " Km")
    createDiv(names[6],data.wind.speed+" Km/h")
    createDiv(names[7],convertUnixTimestamp(data.sys.sunrise))
    createDiv(names[8],convertUnixTimestamp(data.sys.sunset))
    document.getElementById("city_name").innerHTML = data.name
}
function createDiv(name,data){
    var div = document.createElement('div')
        var p = document.createElement('p')
        p.innerHTML = name
        var span = document.createElement('span')
        span.innerHTML = data
        div.appendChild(p)
        div.appendChild(span)
        document.getElementsByClassName("page-2")[0].appendChild(div)
}
function convertUnixTimestamp(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}
function fiveDays(data){
    let page2 = document.getElementsByClassName("hourly")[0];
    while (page2.firstChild) {
        page2.removeChild(page2.firstChild);
    }
    console.log(data)
    five = data.list
    for(let i=0;i<five.length;i=i+4){
        var div = document.createElement('div');
        var image = document.createElement('img');
        image.src = `http://openweathermap.org/img/wn/${
            five[0].weather[0].icon
            }@2x.png`
        var para1 = document.createElement('p');
        para1.id="para1"+i
        para1.innerHTML = five[i].dt_txt
        Object.assign(para1.style,{
            marginBottom:'10px'
        })
        var para2 = document.createElement('p');
        para2.id="para2"+i
        para2.innerHTML = five[i].main.temp + " °C"
        Object.assign(para2.style,{
            marginBottom:'10px'
        })
        var para3 = document.createElement('p');
        para3.id="para3"+i
        para3.innerHTML = five[i].wind.speed + " Km/h"
        Object.assign(para3.style,{
            marginBottom:'10px'
        })
        var para4 = document.createElement('p');
        para4.id="para4"+i
        para4.innerHTML = five[i].weather[0].description
        Object.assign(para4.style,{
            marginBottom:'10px'
        })
        div.appendChild(image)
        div.appendChild(para1)
        div.appendChild(para2)
        div.appendChild(para3)
        div.appendChild(para4)
        document.getElementsByClassName('hourly')[0].appendChild(div)
    }
}
function airPollution(data){
    let page2 = document.getElementsByClassName("gases")[0];
    while (page2.firstChild) {
        page2.removeChild(page2.firstChild);
    }
    document.getElementById("air").innerHTML = data.list[0].main.aqi;
    var names = ["CO","NO",`NO₂`,"OZONE","SO₂","NH₃"]
    var fecth_name = ["co","no","no2","o3","so2","nh3"]
    for(let i=0;i<6;i++){
        var div = document.createElement('div');
        div.className="div"+i
        var p1 = document.createElement('p')
        p1.innerHTML = names[i]
        Object.assign(p1.style,{
            fontWeight:"bold",
            fontSize:"1.5rem"
        })
        var p = document.createElement('span')
        p.innerHTML = data.list[0].components[fecth_name[i]]+ " µg/m³"
        div.appendChild(p1)
        div.appendChild(p)
        document.getElementsByClassName("gases")[0].appendChild(div);
    }
    console.log(data)
}
function coFecthWeather(coord){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=77fb7371a8a6f998d5b6c7d67e0edd67&units=metric`)
        .then(response => response.json())
        .then(data => display(data) )
        .catch(error => console.error("Error:", error));
}
function fetchWeather(location){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=77fb7371a8a6f998d5b6c7d67e0edd67&units=metric`)
        .then(response => response.json())
        .then(data => display(data) )
        .catch(error => console.error("Error:", error));
}
function coFecthForecast(coord){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=77fb7371a8a6f998d5b6c7d67e0edd67&units=metric`)
        .then(response => response.json())
        .then(data => fiveDays(data) )
        .catch(error => console.error("Error:", error));
}
function fetchForecast(location){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=77fb7371a8a6f998d5b6c7d67e0edd67&units=metric`)
        .then(response => response.json())
        .then(data => fiveDays(data) )
        .catch(error => console.error("Error:", error));
}
function FecthPollution(location){
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=77fb7371a8a6f998d5b6c7d67e0edd67`)
        .then(response => response.json())
        .then(data => airPollution(data) )
        .catch(error => console.error("Error:", error));
}
function coFecthPollution(coord){
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=77fb7371a8a6f998d5b6c7d67e0edd67`)
        .then(response => response.json())
        .then(data => airPollution(data) )
        .catch(error => console.error("Error:", error));
} 
function internetStatus(){
    if (navigator.onLine){
        document.getElementsByClassName("label")[0].style.display="none"
        document.querySelector('main').style.display = "block"
    }else{
        document.getElementsByClassName("label")[0].style.display="flex"
        document.querySelector('main').style.display = "none"
    }
}
setInterval(internetStatus, 1000);
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log({lat,lon})
            fetchFromLocation({lat,lon})
        }, () => alert('Geolocation failed.'));
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}
function fetchFromLocation(coord){
    coFecthForecast(coord)
    coFecthWeather(coord)
    coFecthPollution(coord)
}
let city_input = document.getElementById("city")
document.getElementById("city_name").innerHTML = "Delhi"
city_input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getCoordsFromCity(city_input.value)
        document.getElementById("city_name").innerHTML = city_input.value
    }
});
function getLocationFromCoords(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            let city = data.address.city || data.address.town || data.address.village || "Unknown";
            let state = data.address.state || "Unknown";
            let country = data.address.country || "Unknown";

            console.log(`📍 City: ${city}`);
            console.log(`🏛️ State: ${state}`);
            console.log(`🌍 Country: ${country}`);
            return city;
        })
        .catch(error => console.error("Error:", error));
}
function getCoordsFromCity(city) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let lat = data[0].lat;
                let lon = data[0].lon;
                console.log(`📍 City: ${city}`);
                console.log(`🌍 Latitude: ${lat}, Longitude: ${lon}`);
                console.log("GetCoordfromCity")
                console.log({lat,lon})
                if (city = "Delhi"){
                    fetchWeather(city)
                    fetchForecast(city)
                    FecthPollution({lat,lon})
                }
                var coord = {lat,lon}
                coFecthWeather(coord);
                coFecthForecast(coord);
                coFecthPollution(coord);
                return { lat, lon };
            } else {
                console.log("❌ City not found!");
                return {lat:0,lon:0};
            }
        })
        .catch(error => console.error("Error:", error));
}
getCoordsFromCity("Delhi")
