import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import SearchBar from '../../components/SearchBar';
import ExploreContainer from './components/ExploreContainer';

import './Tab1.css';
import { useEffect, useState } from 'react';

import { Geolocation } from '@capacitor/geolocation';
import { initialTransactions } from '../../utils/options';

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
  const [transactions, setTransactions] = useState(() => {
    // Load initial state from localStorage or set default
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : initialTransactions || [];
  });

  useEffect(() => {
    // Update localStorage whenever transactions state changes
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    // Listen for changes in localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'transactions') {
        // Update state when transactions in localStorage change
        const updatedTransactions = event.newValue ? JSON.parse(event.newValue) : [];
        setTransactions(updatedTransactions);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // The commented out useEffect logic for fetching places would remain unchanged

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
