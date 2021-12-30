const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItem = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wecdnesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];

const API_KEY = 'ec3ceca15bd44a2e813ca4d14622eeee';

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

    timeEl.innerHTML = hour12HrFormat + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ` <span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000);

function getWeatherDate() {

    //navigator thuoc BOM( window.navigator ) dung de xem thong tin browser nguoiwf dungf truy cap vao wwebsite cua minh
    navigator.geolocation.getCurrentPosition((succes) => {

        let longitude = succes.coords.longitude; // kinh do (lon)
        let latitude = succes.coords.latitude; // vi~ do(lat)

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.daily)
                renderWeatherData(data);
            })
            .catch(err => console.log(err))

    })
}

function renderWeatherData(data) {

    timeZone.innerHTML = data.timezone;
    currentWeatherItem.innerHTML = `    <div class="weather-item">
                                            <p> Humidily </p>
                                            <p> ${data.current.humidity}% </p>
                                        </div>
                                        <div class="weather-item">
                                            <p> Pressure </p>
                                            <p> ${data.current.pressure} </p>
                                        </div>
                                        <div class="weather-item">
                                            <p> Wind Speed </p>
                                            <p> ${data.current.wind_speed} </p>
                                        </div>
                                        <div class="weather-item">
                                            <p> Sunrise </p>
                                            <p> ${window.moment(data.current.sunrise * 1000).format('HH:mm a')} </p>
                                        </div>
                                        <div class="weather-item">
                                        <p> Sunset </p>
                                        <p> ${window.moment(data.current.sunset * 1000).format('HH:mm a')} </p>
                                    </div>
                                            `
    let otherDayForecast = '';

    data.daily.forEach((day, index) => {
        if (index == 0) {

        } else {
            otherDayForecast += `     
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>`
        }
    });
    weatherForecastEl.innerHTML = otherDayForecast;
}

getWeatherDate();