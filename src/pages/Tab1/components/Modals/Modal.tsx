import React from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from '@ionic/react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <IonModal isOpen={isOpen} aria-hidden="false">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Transaction</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
            reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
            Eaque, dicta.
          </p>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Modal;
