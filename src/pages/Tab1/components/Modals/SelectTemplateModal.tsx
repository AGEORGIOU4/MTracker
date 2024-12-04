import React from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonIcon,
} from '@ionic/react';
import { transaction_categories } from '../../../../utils/options';


const styles = {
  button: {
    margin: "10px auto",
  },

};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSkip: () => void;
}

export const SelectTemplateModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, handleSkip }) => {
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
            <IonTitle>Select Type</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => handleSkip()}>
                Skip
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >
          {transaction_categories.map((transaction, index) => (
            <IonButton
              key={index}
              onClick={() => console.log(`Selected: ${transaction.value}`)}

              expand="block"
              color={"primary"}
              style={styles.button}
            >
              <IonIcon icon={transaction.icon} slot="start" />
              {transaction.label}
            </IonButton>
          ))}
        </IonContent>
      </IonModal>
    </>
  );
};


