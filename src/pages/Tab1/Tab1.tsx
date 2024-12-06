import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import SearchBar from '../../components/SearchBar';
import ExploreContainer from './components/ExploreContainer';

import './Tab1.css';
import { useEffect, useState } from 'react';

import { Geolocation } from '@capacitor/geolocation';

async function getCurrentLocation() {
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


const Tab1: React.FC = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     const location = await getCurrentLocation();

  //     if (location) {
  //       const { latitude, longitude } = location;

  //       const options = {
  //         method: 'GET',
  //         headers: {
  //           accept: 'application/json',
  //           Authorization: 'fsq3jJ5KhpVS3xVOvQJSyj06Y7qb7oBhO7Oon8XHQRqc5iY=', // Replace with your actual API key
  //         },
  //       };

  //       try {
  //         const response = await fetch(
  //           `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=400&fields=name%2Cdistance&sort=DISTANCE&limit=50`,
  //           options
  //         );

  //         if (!response.ok) {
  //           throw new Error('Failed to fetch places');
  //         }

  //         const data = await response.json();
  //         console.log(data);
  //         setPlaces(data.results); // Assuming the API response contains a "results" array
  //       } catch (err: any) {
  //         setError('Error fetching data: ' + err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       setError('Unable to fetch location');
  //       setLoading(false);
  //     }
  //   };

  //   fetchPlaces();
  // }, []); // Empty dependency array to run the effect only once on mount



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchBar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
