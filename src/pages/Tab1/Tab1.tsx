import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { SearchBar } from '../../components/SearchBar';
import { ExploreContainer } from './components/ExploreContainer';
import { useState } from 'react';

const Tab1: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <SearchBar handleSearch={handleSearch} />
        <ExploreContainer type="Expenses" searchQuery={searchQuery} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
