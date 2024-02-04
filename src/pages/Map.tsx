import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGeolocated  } from "react-geolocated";
export default function Map(props: any) {
    const geolocation = useGeolocated({
positionOptions:{
    enableHighAccuracy:true
},userDecisionTimeout:1000
      });
    const DEFAULT_LANGITUDE = 35.3119022820198;
    const DEFAULT_LATITUDE = 37.02601573209708;
    const[longitude,setLongitude] = useState<any>(geolocation.coords ? geolocation.coords.longitude:DEFAULT_LANGITUDE)
    const[latitude,setLatitude] = useState<any>(geolocation.coords ? geolocation.coords.latitude:DEFAULT_LATITUDE)

    useEffect(() => {
        if (geolocation.coords) {
          setLongitude(geolocation.coords.longitude);
          setLatitude(geolocation.coords.latitude);
        }
      }, [geolocation.coords]);
     
    return (
        <MapContainer center={[latitude,longitude]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org.copyright">OpenStreetMap</a> contributors'
            ></TileLayer>
            <Marker position={
                [latitude,longitude]
            }
            >
                <Popup>
                    Your are Here!
                </Popup>
            </Marker>
            
        </MapContainer>
    );

}

