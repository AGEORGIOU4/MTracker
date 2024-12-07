import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

export const FloatingButton: React.FC<FloatingButtonProps> = ({ handleClick }) => {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="bottom">
      <IonFabButton onClick={handleClick}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
};

interface FloatingButtonProps {
  handleClick: () => void; // Specify the type of the handleClick prop
}