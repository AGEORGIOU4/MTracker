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
    margin: "20px auto"
  },

};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSkip: () => void;
  handleSelectTemplate: (item: any) => void;
}

export const SelectTemplateModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, handleSkip, handleSelectTemplate }) => {
  return (
    <>
      <IonModal isOpen={isOpen} aria-hidden="false">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => setIsOpen(false)}>
                Cancel
              </IonButton>
            </IonButtons>

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
              onClick={() => handleSelectTemplate(transaction)}
              expand="block"
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


