import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


export function ChangeView({ position, mapZoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, mapZoom);
  }, [position, map, mapZoom]);

  return null;
}