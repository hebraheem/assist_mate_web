import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'src/services/firebase';

const LiveLocationUpdater = () => {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to update Firestore with the current location
  const updateLocationInFirestore = async (lat: number, lon: number) => {
    const user = auth.currentUser; // Get the currently authenticated user
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        location: { latitude: lat, longitude: lon },
        lastUpdated: new Date().toISOString(),
      });
      console.log('Location updated successfully in Firestore.');
    } catch (error) {
      console.error('Error updating location in Firestore:', error);
    }
  };

  // Callback function when the location changes
  const successHandler = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setPosition({ lat: latitude, lon: longitude });
    updateLocationInFirestore(latitude, longitude);
  };

  // Callback function when an error occurs
  const errorHandler = (error: GeolocationPositionError) => {
    setError(error.message);
    console.error('Error getting location:', error);
  };

  useEffect(
    () => {
      const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
      console.log('position :>> ', position);
      console.log('error :>> ', error);
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    },
    // eslint-disable-next-line
    []
  );

  return null;
};

export default LiveLocationUpdater;
