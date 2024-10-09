/*global google*/
export const TRAVEL_MODE_MAPPER = (mode: google.maps.TravelMode): string => {
  return {
    DRIVING: 'Driving',
    WALKING: 'Foot',
    BICYCLING: 'Cycling',
    TRANSIT: 'Public transport',
  }[mode];
};
