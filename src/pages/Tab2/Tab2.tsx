import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import SearchBar from '../../components/SearchBar';

import './Tab2.css';
import ExploreContainer from '../Tab1/components/ExploreContainer';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchBar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer type="Income" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
