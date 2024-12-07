import { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { ExploreContainer } from '../Tab1/components/ExploreContainer';
import { SearchBar } from '../../components/SearchBar';

const Tab2: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value)
  }


  return (
    <IonPage>
      <IonContent fullscreen>
        <SearchBar handleSearch={handleSearch} />
        <ExploreContainer type="Income" searchQuery={searchQuery} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
