const apiKey = 'c3509715a031fa127b200b01ad02fc75'; // Replace with your own API key

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    // Fetch weather for the entered city
    await fetchWeather(cityName, 'weatherInfo');

    // Fetch weather for the current location
    await fetchWeatherForCurrentLocation('currentLocationWeather');
}

async function fetchWeather(cityName, containerId) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data, containerId);
        } else {
            alert(`Error: ${response.status} - ${data.message}`);
        }
    } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error);
    }
}

async function fetchWeatherForCurrentLocation(containerId) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    if (response.ok) {
                        displayWeather(data, containerId);
                    } else {
                        alert(`Error: ${response.status} - ${data.message}`);
                    }
                } catch (error) {
                    console.error('Error fetching weather data for current location:', error);
                }
            },
            (error) => {
                console.error('Error getting current location:', error);
                alert('Error getting current location. Please make sure location services are enabled and try again.');
            },
            { timeout: 10000 } // Set a timeout of 10 seconds
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data, containerId) {
    const weatherContainer = document.getElementById(containerId);
    weatherContainer.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Call the getWeather function to start fetching weather data
getWeather();
