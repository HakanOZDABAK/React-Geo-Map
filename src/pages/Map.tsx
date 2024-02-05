import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useGeolocated } from "react-geolocated";

function LocationMarker({ setLocation }:{ setLocation :any }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

export default function Map() {
  const [location, setLocation] = useState(null);
  const geolocation = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
      maximumAge: 0,
    },
    userDecisionTimeout: 10000,
  });

  const DEFAULT_LANGITUDE = 17.63550145595826;
  const DEFAULT_LATITUDE = 35.242209769953156;
  const [longitude, setLongitude] = useState<any>(
    geolocation.coords ? geolocation.coords.longitude : DEFAULT_LANGITUDE
  );
  const [latitude, setLatitude] = useState<any>(
    geolocation.coords ? geolocation.coords.latitude : DEFAULT_LATITUDE
  );

  useEffect(() => {
    if (geolocation.coords) {
      setLongitude(geolocation.coords.longitude);
      setLatitude(geolocation.coords.latitude);
    }
  }, [geolocation.coords]);

  return (
    <MapContainer center={[latitude, longitude]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org.copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Your are Here!</Popup>
      </Marker>
      <LocationMarker setLocation={setLocation} />
    </MapContainer>
  );
}
