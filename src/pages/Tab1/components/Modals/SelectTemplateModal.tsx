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
import { categories } from '../../../../utils/options';

const styles = {
  buttonCard: (color: string) => ({
    aspectRatio: 1 / 1,
    width: "100%",
    margin: "auto", // Minimal margin for spacing
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //background: color,
    color: "#007aff"
  }),
  cardContent: {
    textAlign: "center",
    padding: 0,
    fontSize: "15px"
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

            <IonTitle>Select Type</IonTitle>

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
              {categories.map((transaction, index) => (
                <IonCol size="4" key={index}>
                  <IonCard
                    button
                    onClick={() => handleSelectTemplate(transaction)}
                    style={styles.buttonCard(transaction.color)}
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
