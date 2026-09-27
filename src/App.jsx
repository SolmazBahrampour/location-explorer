import { useState } from 'react';
import { Header } from './components/header/Header';
import { IpInfo } from './components/ipinfo/Ipinfo/IpInfo';
import { Map } from './components/map/Map';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './App.css';


function App() {
  const [inputText, setInputText] = useState('');
  const [position, setPosition] = useState([43.6532, -79.3832]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [mapZoom, setMapZoom] = useState(13);
  const [showAllAttractions, setShowAllAttractions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  async function getAttractions(latitude, longitude) {
    const response = await axios.get(
      'https://api.geoapify.com/v2/places',
      {
        params: {
          categories:
            'tourism',
          filter: `circle:${longitude},${latitude},5000`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 16,
          apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
        }
      }
    );

    return response.data.features;

  }


  function isIpAddress(value) {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(value);
  }

  async function search() {
    setIsLoading(true);
    setError('');

    try {
      let latitude;
      let longitude;
      let locationData;


      if (isIpAddress(inputText)) {
        const response = await axios.get(`https://ipapi.co/${inputText}/json/`);

        const data = response.data;

        latitude = data.latitude;
        longitude = data.longitude;

        locationData = {
          ip: data.ip,
          city: data.city,
          country: data.country_name,
          region: data.region_code,
          timezone: data.timezone,
          coordinates: [data.latitude, data.longitude]
        };

        setPosition([
          response.data.latitude,
          response.data.longitude
        ]);
      } else {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inputText)}&count=1`);

        const location = response.data.results[0];

        latitude = location.latitude;
        longitude = location.longitude;

        locationData = {
          ip: null,
          city: location.name,
          country: location.country,
          region: location.admin1,
          timezone: location.timezone,
          coordinates: [location.latitude, location.longitude]
        };
      }

      const [attractionsData, weatherResponse, airQualityResponse] =
        await Promise.all([
          getAttractions(latitude, longitude),

          axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`),

          axios.get(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi`
          )
        ]);

      setAttractions(attractionsData);

      const weather = weatherResponse.data.current;
      const airQuality = airQualityResponse.data.current;


      setLocationInfo({
        ...locationData,
        weather: weather,
        airQuality: airQuality
      })

      setPosition([
        latitude,
        longitude
      ]);

      setMapZoom(13);

      setIsLoading(false);

    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }





  return (
    <>
      <Header
        inputText={inputText}
        setInputText={setInputText}
        search={search}
      />

      {isLoading ? (
        <div className='loading'>
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="error-page">
          <div className="error-card">
            <div className="error-icon">!</div>

            <h2>Something went wrong</h2>

            <p>{error}</p>
          </div>
        </div>
      ) : (
        <>
          <IpInfo
            locationInfo={locationInfo}
            attractions={attractions}
            setPosition={setPosition}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            setMapZoom={setMapZoom}
            showAllAttractions={showAllAttractions}
            setShowAllAttractions={setShowAllAttractions}
          />
          <Map
            position={position}
            mapZoom={mapZoom}
          />
        </>
      )}
    </>
  );
}


export default App;