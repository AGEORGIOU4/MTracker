import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import SearchBar from '../../components/SearchBar';

import './Tab3.css';
import ExploreContainer from '../Tab1/components/ExploreContainer';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchBar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer type="Transfers" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
