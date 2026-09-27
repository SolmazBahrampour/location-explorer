import { getAirQualityText, getWeatherText } from '../../../utils/helpers';
import './InfoCard.css';

export function InfoCard({ locationInfo }) {
  const localTime = new Intl.DateTimeFormat('en-US', {
    timeZone: locationInfo.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());

  const localDate = new Intl.DateTimeFormat('en-US', {
    timeZone: locationInfo.timezone,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return (
    <>
      <div className="location-overview">
        <img src='/images/icon-location-red.png' />
        <div className="location-text">
          <h2>
            {locationInfo.city || '-'}
            {locationInfo.country ? `, ${locationInfo.country}` : ''}
          </h2>
          <p>
            {locationInfo.region || 'Location Information'}
          </p>
        </div>
      </div>

      <div className="info-card">
        <img className='timezone-image' src='/images/icon-timezone-blue.png' />
        <div className="info-card-text">
          <span>TIMEZONE</span>
          <p className='timezone-text'>
            {locationInfo.timezone?.replace('/', '/\u200B') || '-'}
          </p>
        </div>
      </div>

      <div className="info-card">
        <img src='/images/icon-clock.png' />
        <div className="info-card-text">
          <span>LOCAL TIME</span>
          <p>{localTime}</p>
          <small>{localDate}</small>
        </div>
      </div>

      <div className="info-card">
        <img src='/images/icon-air-quality.png' />
        <div className="info-card-text">
          <span>AIR QUALITY</span>
          <p>{getAirQualityText(locationInfo.airQuality?.us_aqi || '-')}</p>
          <small>AQI {locationInfo.airQuality?.us_aqi || '-'}</small>
        </div>
      </div>

      <div className="info-card">
        <img src='/images/icon-weather.png' />
        <div className="info-card-text">
          <span>WEATHER</span>
          <p>{locationInfo.weather?.temperature_2m || '-'}°C</p>
          <small className='weather-text'>{getWeatherText(locationInfo.weather?.weather_code)}</small>
        </div>
      </div>
    </>
  );
}