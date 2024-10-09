export type LatLng = google.maps.LatLng | google.maps.LatLngLiteral | undefined;

export interface MapWithMarkers extends google.maps.Map {
  markers?: google.maps.marker.AdvancedMarkerElement[];
}
