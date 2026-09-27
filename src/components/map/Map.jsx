import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ChangeView } from './ChangeView';
import './Map.css';

export function Map({ position, mapZoom }) {
  return (
    <MapContainer
      className='map'
      center={position}
      zoom={mapZoom}
      scrollWheelZoom={true}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <ChangeView
        position={position}
        mapZoom={mapZoom}
      />

      <Marker
        position={position}
      />

    </MapContainer>
  );
}