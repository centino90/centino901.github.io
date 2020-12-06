const api = {
    key: "39b05aaef93aa9c56ad64634705bd2af",
    base: "https://api.openweathermap.org/data/2.5/"
}

// global vars
const searchbox = document.querySelector('.search-box');
const button = document.querySelector('.search-button');

// event listener
button.addEventListener('click', () => getResults(searchbox.value));

function getResults(query) {
    if (query == '' || query == undefined) {
        removeContent()
        return
    }
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    if (!weather || weather.name == undefined) {
        removeContent()
        replaceContent()
        return
    }

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    searchbox.value = ''
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function removeContent() {
    document.querySelector('.location .city').innerHTML = ''
    document.querySelector('.location .date').innerHTML = ''
    document.querySelector('.current .temp').innerHTML = ''
    document.querySelector('.current .weather').innerHTML = ''
    document.querySelector('.hi-low').innerHTML = ''

    searchbox.value = ''
}

function replaceContent() {
    const ele = document.querySelector('.location .city');
    ele.innerHTML = '<span style="font-weight: 600">Error:</span> Select an existing country or city <br> <span style="font-size: 1.8rem;text-shadow: none">For example: Phillippines or Davao (it is not case sensitive)</span>'
}
