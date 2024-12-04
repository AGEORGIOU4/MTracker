import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import SearchBar from '../../components/SearchBar';
import ExploreContainer from './components/ExploreContainer';

import './Tab1.css';


const Tab1: React.FC = () => {
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
