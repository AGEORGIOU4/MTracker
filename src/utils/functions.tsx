export const generateRandomColor = (): string => {
  const ionicColors = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark',
  ];
  const randomIndex = Math.floor(Math.random() * ionicColors.length);
  return ionicColors[randomIndex];
};


import { Geolocation } from '@capacitor/geolocation';


export async function getCurrentLocation() {
  try {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null; // Return null if the location can't be fetched
  }
}

// fsq3fQI6suFi2HaXSDV5hnKh9I6j1rGAoc2h+ktJMLD0npI=
