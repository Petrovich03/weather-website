
const savedCity = localStorage.getItem('userCity');
const savedTime = localStorage.getItem('userTime');
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const data = `${year}-${month}-${day}`
console.log(data);

const userCityElement = document.getElementById('userCity');
if (userCityElement) {
    userCityElement.textContent = savedCity;
}


function getWeatherData(city) {

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=34036da8339c4ca8881153911231210&q=${city}&days=3&aqi=no&alerts=no`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            for (let k = 0; k < 3; k++) {
                const forecast = data.forecast.forecastday[k].hour;


                let container;
                for (let i = 0; i < 24; i++) {
                    if (i % 6 === 0) {
                        container = document.createElement('div');
                        container.className = 'row'; // Создаем новую строку
                        document.body.appendChild(container);
                    }

                    const hourData = forecast[i];
                    const icon = hourData.condition.icon;
                    const temp_c = hourData.temp_c;
                    const temp_f = hourData.temp_f;
                    const humidity = hourData.humidity;
                    const wind_kph = hourData.wind_kph;
                    const wind_mph = hourData.wind_mph;
                    const time = hourData.time;

                    const weatherBox = document.createElement('div');
                    weatherBox.className = "col-md-2 col-sm-4";
                    weatherBox.innerHTML = `
            <div class="weather-box">
              <p>Время: ${time}</p>
              <img src="https:${icon}" alt="Погодные условия">
              <p>Температура: ${temp_c}°C (${temp_f}°F)</p>
              <p>Влажность: ${humidity}%</p>
              <p>Скорость ветра: ${wind_kph} км/ч (${wind_mph} миль/ч)</p>
            </div>
          `;



                    container.appendChild(weatherBox);
                    if (i === 23) {
                        container = document.createElement('div');
                        container.className = 'row';
                        document.body.appendChild(container);

                        const textElement = document.createElement('p');
                        textElement.style.textAlign = 'center';
                        textElement.style.fontFamily = 'sans-serif';
                        textElement.style.fontSize = '50px';
                        textElement.style.color = 'darksalmon';
                        textElement.style.fontWeight = 'bold';
                        textElement.style.padding = '50px';

                        if (k === 0) {
                            textElement.textContent = "Погода завтра:";
                        }
                        if (k === 1) {
                            textElement.textContent = "Погода послезавтра:";
                        }

                        container.appendChild(textElement);
                    }
                }
            }
        });
}

if (savedCity) {
    getWeatherData(savedCity);
}
