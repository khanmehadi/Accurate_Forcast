
let submitSearch = document.getElementById('submit-search');
let cityName = document.getElementById('city-name');
let formGroup = document.getElementById('form-group');
let searchEl = submitSearch['city-name']
let searchBtn = document.getElementById('search-btn');
let tempEl = document.getElementById('temp1');
let windEl = document.getElementById('wind1');
let humidityEl = document.getElementById('humidity1');
let allDays = document.querySelectorAll('.day');
let forcastEl = document.querySelector('.forcastEl')
let API = '71e9f14565a5c020953fdced09fe8e45';


// Git items from localstorage
var historyList = JSON.parse(localStorage.getItem("city")) || [];



function getDate() {
    let day = dayjs()
    let currentDay = document.getElementById('day');
    currentDay.innerHTML = dayjs().format('MM/DD/YYYY')

    for (let i = 0; i < allDays.length; i++){
        allDays[i].innerHTML = day.add(1 + i, 'day')
    }
}

// Render the weather info
function weatherInfo(city) {
    getDate();

    // Get the input city name
    let cityEl = document.getElementById('city');
    cityEl.textContent = city;

    // Locate the city object and parse through specific properties to apply to the elements
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API}`)
    .then(res => {
        return res.json();
    }).then(data => {
        console.log(data)
        for (let i = 0; i < 6; i++) {
            document.getElementById('temp' + (i+1)).innerHTML = "Temp: " + data.list[i].main.temp + ' F';
            document.getElementById('wind' + (i+1)).innerHTML = "Wind: " + data.list[i].wind.speed + ' MPH';
            document.getElementById('humidity' + (i+1)).innerHTML = "Humidity: " + data.list[i].main.humidity + ' %';
            document.getElementById('img' + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png"
        }
    })

    for (let i = 0; i < 6; i++) {

    }
}


// Push the new city name to the array list and store the name within localstorage
function addNewCity(cityName) {
    historyList.push(cityName)
    localStorage.setItem("city", JSON.stringify(historyList))
    return cityName;
}

// Create and append the search history elements  
function createCity(city) {
    let historyElContainer = document.createElement('div');
    let historyEl = document.createElement('h3');
    historyEl.setAttribute('class', 'history-el');
    historyEl.innerText = city;

    historyElContainer.appendChild(historyEl);
    formGroup.appendChild(historyElContainer);
}

historyList.forEach(createCity);


// Submit the form and desplay the contents
submitSearch.onsubmit = (e) => {
    e.preventDefault();

    let newCity = addNewCity(searchEl.value)

    createCity(newCity);
    weatherInfo(newCity);
    
    searchEl.value = " ";
}





