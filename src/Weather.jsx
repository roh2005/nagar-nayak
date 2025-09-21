import React, { useState, useEffect } from 'react';

const weatherContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: 'white',
  whiteSpace: 'nowrap',
  fontSize: '14px',
};

// New styles for the container and city name
const weatherInfoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const cityStyle = {
  fontSize: '0.8rem',
  marginTop: '2px',
};

const iconStyle = {
  width: '40px',
  height: '40px',
  objectFit: 'contain',
};

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  // ⚠️ Important: Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
 const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError('Location access denied. Please enable it for weather updates.');
          console.error("Geolocation error:", err);
        }
      );
    } else {
      setError('Geolocation not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setWeatherData(data);
        })
        .catch(err => {
          setError('Failed to fetch weather data.');
          console.error("Weather API error:", err);
        });
    }
  }, [location, API_KEY]);

  if (error) {
    return <div style={weatherContainerStyle}>{error}</div>;
  }

  if (!weatherData) {
    return <div style={weatherContainerStyle}>Loading weather...</div>;
  }

  const { main, weather } = weatherData;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
 return (
  <div style={weatherContainerStyle}>
    <img src={iconUrl} alt={weather[0].description} style={iconStyle} />
    <div style={weatherInfoContainerStyle}>
      <span>{Math.round(main.temp)}°C</span>
      <span style={cityStyle}>{weatherData.name}</span>
    </div>
  </div>
);
}

export default Weather;