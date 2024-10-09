import React, { useEffect } from 'react';
import { IPosition } from '../@types/utils';

const position: IPosition = {
  latitude: null,
  longitude: null,
  error: null,
};
const useUserLocation = () => {
  const [data, setData] = React.useState<IPosition>(position);

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    // Success callback
    function showPosition(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setData((prev) => ({ ...prev, latitude, longitude }));
    }

    // Error callback
    function showError(error: any) {
      let message: string | null;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          message = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          message = 'An unknown error occurred.';
          break;
      }
      setData((prev) => ({ ...prev, error: message }));
    }
  }, []);

  return data;
};

export default useUserLocation;
