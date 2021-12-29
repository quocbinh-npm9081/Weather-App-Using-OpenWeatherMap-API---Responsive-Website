const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItem = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wecdnesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];


setInterval(() => {

    let time = new Date();
    // console.log(time);
    const month = time.getMonth();
    const date = time.getDate(); //ngay trong thang
    const day = time.getDay(); //ngay trong tuan
    const hour = time.getHours();
    const hour12HrFormat = hour >= 13 ? hour % 12 : hour // chuyen doi sang h dang 12/24
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    timeEl.innerHTML = hour12HrFormat + ':' + minutes + ' ' + ` <span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);