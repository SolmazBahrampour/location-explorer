export function getWeatherText(code) {
  if (code === 0) return 'Clear sky';

  if (code === 1) return 'Mainly clear';

  if (code === 2) return 'Partly cloudy';

  if (code === 3) return 'Overcast';

  if (code === 45 || code === 48) return 'Fog';

  if (code >= 51 && code <= 55) return 'Drizzle';

  if (code === 56 || code === 57) return 'Freezing drizzle';

  if (code >= 61 && code <= 65) return 'Rain';

  if (code === 66 || code === 67) return 'Freezing rain';

  if (code >= 71 && code <= 75) return 'Snow fall';

  if (code === 77) return 'Snow grains';

  if (code >= 80 && code <= 82) return 'Rain showers';

  if (code === 85 || code === 86) return 'Snow showers';

  if (code === 95) return 'Thunderstorm';

  if (code === 96 || code === 99) return 'Thunderstorm with hail';

  return 'Unknown';
}

export function getAirQualityText(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very unhealthy';
  if (aqi <= 500) return 'Hazardous';

  return 'Unknown';
}
