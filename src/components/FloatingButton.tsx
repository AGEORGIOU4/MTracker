import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

interface FloatingButtonProps {
  handleClick: () => void; // Specify the type of the handleClick prop
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ handleClick }) => {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="bottom">
      <IonFabButton onClick={handleClick}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
};

export default FloatingButton;
