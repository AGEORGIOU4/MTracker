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


const styles = {
  button: {
    margin: "10px auto"
  }
}
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

}

export const DetailsModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => setIsOpen(false)}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Welcome</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => console.log("Confirm")}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          HEllo
        </IonContent>
      </IonModal>
    </>
  );
};


