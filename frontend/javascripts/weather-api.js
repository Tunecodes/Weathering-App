export async function fetchWeatherData(lat, lon) {
    const pointUrl = `https://api.weather.gov/points/${lat},${lon}`;
  
    const pointRes = await fetch(pointUrl);
    const pointData = await pointRes.json();
    const { forecast, forecastHourly, forecastZone } = pointData.properties;
  
    const location = `${pointData.properties.relativeLocation.properties.city}, ${pointData.properties.relativeLocation.properties.state}`;

    // 7-day Forecast
    const forecastRes = await fetch(forecast);
    const forecastData = await forecastRes.json();
    const daytimePeriods = forecastData.properties.periods.filter(p => p.isDaytime);

  
    // Hourly Forecast
    const hourlyRes = await fetch(forecastHourly);
    const hourlyData = await hourlyRes.json();
  
    // Current conditions (from observation stations)
    const currentWeather = hourlyData.properties.periods[0];

    // Alerts
    const forecastZoneId = forecastZone.split('/').pop();
    const alertsUrl = `https://api.weather.gov/alerts/active/zone/${forecastZoneId}`;
    const alertsRes = await fetch(alertsUrl);
    const alertsData = await alertsRes.json();
    //if no alerts:
    const alerts = alertsData.features > 0 ? alertsData.features : [];

    return {
      location: location, // just a string like "Amherst, MA"
      current: currentWeather, //first period of the forecastHourly
      daily: daytimePeriods, //daytime periods of the forecast
      hourly: hourlyData.properties.periods.slice(1, 6), // next 5 hours: periods 2 through 6 on forecastHourly
      alerts: alerts, 
    };
  }
  