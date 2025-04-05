import eventHub from "./eventhub.js";
import { Theme } from "./theme.js";
import { fetchWeatherData } from './weather-api.js';
import { getWeatherIcon } from "./iconFinder.js";

const toggleTheme = document.querySelector("#toggle");

function getCurrentPage() {
  return localStorage.getItem("currentPage") || "home";
}

eventHub.subscribe("themeChange", (mode) => {
  const currentPage = getCurrentPage();
  if (currentPage === "home") {
    Theme.homePage(mode);
  }
  if (currentPage === "activity") {
    Theme.activityPage(mode);
  } else {
    Theme.suggestionPage(mode);
  }
});

toggleTheme.addEventListener("change", () => {
  eventHub.update("themeChange", toggleTheme.checked ? "dark" : "light");
});


/*      Adding results from API to Home Page      Search is not implemented as of now!      */

// Fetch default weather data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const defaultLat = 42.3555;  // Example: Boston, MA latitude
  const defaultLon = -71.0565; // Example: Boston, MA longitude

  // Fetch and display the weather for default location
  fetchAndUpdateWeather(defaultLat, defaultLon);

  const searchBtn = document.querySelector('.fa-magnifying-glass').parentElement;
  searchBtn.addEventListener('click', async () => {
    // Temporarily hardcoded lat/lon for search (Amherst, MA)
    const lat = 42.3732;
    const lon = -72.5199;

    try {
      const data = await fetchWeatherData(lat, lon);
      updateWeatherUI(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  });
});

// Function to fetch and update weather data
async function fetchAndUpdateWeather(lat, lon) {
  try {
    const data = await fetchWeatherData(lat, lon);
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

function updateWeatherUI(data) {
  //  CURRENT WEATHER
  const location = document.getElementById('location');
  const temperature = document.getElementById('temperature');
  location.querySelector('h2').textContent = data.location;
  const now = new Date();
  const formattedTime = now.toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // user's time zone
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  location.querySelector('p').textContent = formattedTime;

  // const currentWeatherIcon = document.querySelector('#current-weather-icon');
  // currentWeatherIcon.src = getWeatherIcon(data.current.shortForecast);

  temperature.querySelector('h2').textContent = data.current.shortForecast;
  temperature.querySelectorAll('h2')[1].textContent = `${data.current.temperature}°F`;

  //  HOURLY (next 5)
  const hourlyDivs = document.querySelectorAll('.tody-con > div');
  data.hourly.forEach((hour, i) => {
    if (hourlyDivs[i]) {
      const localTime = new Date(hour.startTime);
      const formattedHour = localTime.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      hourlyDivs[i].querySelector('h3').textContent = formattedHour;
      hourlyDivs[i].querySelector('p').textContent = `${hour.temperature}°F`;
      hourlyDivs[i].querySelectorAll('p')[1].textContent = hour.shortForecast;

      // const hourlyIcon = hourlyDivs[i].querySelector('img');
      // hourlyIcon.src = getWeatherIcon(hour.shortForecast);
    }
  });

  //  DAILY FORECAST (7 days)
  const dailyDivs = document.querySelectorAll('.seven-days .day');
  data.daily.slice(0, 7).forEach((day, i) => {
    if (dailyDivs[i]) {
      dailyDivs[i].querySelector('h4').textContent = day.name;
      dailyDivs[i].querySelector('p').textContent = `${day.temperature}°F`;
      dailyDivs[i].querySelectorAll('p')[1].textContent = day.shortForecast;

      // const dailyIcon = dailyDivs[i].querySelector('img');
      // dailyIcon.src = getWeatherIcon(day.shortForecast);
    }
  });

  //  ALERTS
  const alertDiv = document.getElementById('alert');
  if (data.alerts.length > 0) {
    const alert = data.alerts[0].properties; 
    alertDiv.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Alert Type:</strong> ${alert.event}`;
    alertDiv.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Severity:</strong> ${alert.severity}`;
    alertDiv.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Description:</strong> ${alert.description}`;
    alertDiv.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Issued At:</strong> ${new Date(alert.sent).toLocaleString()}`;
    alertDiv.querySelector('p:nth-of-type(5)').innerHTML = `<strong>Expires At:</strong> ${new Date(alert.expires).toLocaleString()}`;
  } else {
    alertDiv.innerHTML = `<h3>Weather Alert</h3><p>No active alerts</p>`;
  }

  //  AIR QUALITY — Placeholder (will hook up later with AirNow or similar)
  const airDiv = document.getElementById('aircondition');
  airDiv.querySelector('p strong').textContent = 'City Name (placeholder)';
  airDiv.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Recorded At:</strong> ${new Date(data.current.timestamp).toLocaleString()}`;
  airDiv.querySelectorAll('ul li')[0].textContent = `PM2.5: placeholder`;
  airDiv.querySelectorAll('ul li')[1].textContent = `PM10: placeholder`;
  airDiv.querySelectorAll('ul li')[2].textContent = `Ozone (O3): placeholder`;
  airDiv.querySelectorAll('p')[3].innerHTML = `<strong>Humidity:</strong> ${data.current.relativeHumidity.value}%`;
  airDiv.querySelectorAll('p')[4].innerHTML = `<strong>Wind Speed:</strong> ${data.current.windSpeed}`;
  airDiv.querySelectorAll('p')[5].innerHTML = `<strong>Wind Direction:</strong> ${data.current.windDirection}`;
  airDiv.querySelectorAll('p')[6].innerHTML = `<strong>Pressure:</strong> placeholder`;
}