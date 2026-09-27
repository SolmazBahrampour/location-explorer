# 🌍 Location Explorer

A responsive React application for exploring locations, weather, air quality, local time, and nearby attractions.

Users can search for an IP address, domain, or location and get detailed information about the selected place on an interactive map.

## 🚀 Live Demo

🔗 [View Live Demo](soon)

## 📸 Screenshots

![Project Preview](./screenshot/preview.pngpreview.png)


## ✨ Features

- 🔎 Search by IP address, domain, or location
- 🗺️ Interactive map powered by OpenStreetMap
- 📍 Display location information including:
  - City
  - Country
  - Region
  - Timezone
- 🕐 Display local time and date for the selected location
- 🌤️ Display current weather information
- 💨 Display air quality information
- 🏛️ Discover nearby attractions
- 🏷️ Filter attractions by category
- 📌 View attractions directly on the map
- 📱 Fully responsive design
- ⏳ Loading state while fetching data
- ⚠️ Error handling for failed searches or API requests

## 🛠️ Built With

- React
- JavaScript
- Vite
- Axios
- React Leaflet
- Leaflet
- CSS
- OpenStreetMap

## 🔌 APIs & Services

This project uses several external services:

- **Geoapify** — Nearby places and attractions
- **Open-Meteo** — Weather and air quality data
- **ipapi** — IP address and location information
- **OpenStreetMap** — Interactive map tiles

## 📂 Project Structure

```text
src/
├── components/
│   ├── Header/
│   ├── IpInfo/
│   │   ├── IpInfo.jsx
│   │   ├── InfoCard.jsx
│   │   └── Attractions.jsx
│   └── Map/
│       └── Map.jsx
│
├── App.jsx
├── App.css
└── main.jsx