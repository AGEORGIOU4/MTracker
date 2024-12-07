import { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { ExploreContainer } from '../Tab1/components/ExploreContainer';
import { SearchBar } from '../../components/SearchBar';

const Tab3: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <SearchBar handleSearch={handleSearch} />
        <ExploreContainer type="Transfers" searchQuery={searchQuery} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
