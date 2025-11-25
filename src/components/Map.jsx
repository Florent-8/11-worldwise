import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useMap } from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Button from "./Button.jsx";

function Map() {
   const { cities } = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
 
  const [mapLat, mapLng] = useUrlPosition();
  

  // derive center from query params when available, otherwise geolocation, otherwise default
  const defaultPosition = [40, 0];
  const center =
    Number.isFinite(mapLat) && Number.isFinite(mapLng)
      ? [mapLat, mapLng]
      : Number.isFinite(geolocationPosition?.lat) &&
        Number.isFinite(geolocationPosition?.lng)
      ? [geolocationPosition.lat, geolocationPosition.lng]
      : defaultPosition;
  // avoid navigating on any container click (buttons inside would trigger it)
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (<Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your Position"}
      </Button>)}
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {Number.isFinite(mapLat) && Number.isFinite(mapLng) ? (
          <ChangeCenter position={center} />
        ) : Number.isFinite(geolocationPosition?.lat) &&
          Number.isFinite(geolocationPosition?.lng) ? (
          <ChangeCenter
            position={[geolocationPosition.lat, geolocationPosition.lng]}
          />
        ) : null}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
