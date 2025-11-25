import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {

    const [searchParams] = useSearchParams();
    
    
    // parse query params as numbers
    const rawLat = searchParams.get("lat");
    const rawLng = searchParams.get("lng");
    const lat = rawLat ? parseFloat(rawLat) : null;
    const lng = rawLng ? parseFloat(rawLng) : null;

    return [lat, lng];
}