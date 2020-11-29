import React, { useEffect, useState } from 'react';

import {useFonts} from 'expo-font';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';
import Routes from './src/routes';

import * as Location from 'expo-location';

interface locationInterface {
  latitude: number;
  longitude: number;
}

declare const global: {
  location: locationInterface | {}
}

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: 1
      });
      setLocation(location);
    })(); 
  }, []);

  if (errorMsg) {
    alert(errorMsg);
  } else if (location) {
    global.location = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
  }

  if(!fontsLoaded) {
    return null;
  }

  return (
    <Routes />
  )
}
