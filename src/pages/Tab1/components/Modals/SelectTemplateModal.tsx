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
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { transaction_categories } from '../../../../utils/options';

const styles = {
  buttonCard: {
    aspectRatio: 1 / 1,
    width: "100%",
    margin: "auto", // Minimal margin for spacing
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
  cardContent: {
    textAlign: "center",
    padding: 0, // Remove padding inside the card
  },
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSkip: () => void;
  handleSelectTemplate: (item: any) => void;
}

export const SelectTemplateModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleSkip,
  handleSelectTemplate,
}) => {
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
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              {transaction_categories.map((transaction, index) => (
                <IonCol size="6" key={index}>
                  <IonCard
                    button
                    onClick={() => handleSelectTemplate(transaction)}
                    style={styles.buttonCard}
                  >
                    <IonCardContent style={styles.cardContent}>
                      <IonIcon icon={transaction.icon} />
                      <div>{transaction.label}</div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
};
