import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

function FloatingButton() {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="bottom">
      <IonFabButton>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}
export default FloatingButton;