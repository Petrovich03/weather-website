document.getElementById('submitBtn').addEventListener('click', function () {
    var city = document.getElementById('cityInput').value;
    fetch('http://api.weatherapi.com/v1/current.json?key=34036da8339c4ca8881153911231210&q=' + city)
        .then(response => response.json())
        .then(data => {
            var weatherInfo = document.getElementById('weatherInfo');
            const currentTime = data.location.localtime;
            var html = `
                    <h3>Погода в городе ${data.location.name}, ${data.location.country}</h3>
                    <img src="http:${data.current.condition.icon}" alt="Погодные условия">
                    <p>Температура: ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
                    <p>Влажность: ${data.current.humidity}%</p>
                    <p>Скорость ветра: ${data.current.wind_kph} км/ч (${data.current.wind_mph} миль/ч)</p>
                `;
            weatherInfo.innerHTML = html;
        })

        .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);
            var weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = 'Не удалось получить данные о погоде.';
        });
});


const savedCity = localStorage.getItem('userCity');



if (savedCity) {
    document.getElementById('cityInput').value = savedCity;
    document.getElementById('submitBtn').click();
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const cityInput = document.getElementById('cityInput').value;


    localStorage.setItem('userCity', cityInput);
});