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
import { expenses_categories, income_categories, transfers_categories } from '../../../../utils/options';

export const SelectTemplateModal: React.FC<ModalProps> = ({
  type,
  isOpen,
  setIsOpen,
  handleSkip,
  handleSelectTemplate,
}) => {
  return (
    <>
      <IonModal isOpen={isOpen} aria-hidden="false">
        <IonHeader mode='ios'>
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
              {type === "Expenses" && expenses_categories.map((transaction, index) => (
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

              {type === "Income" && income_categories.map((transaction, index) => (
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

              {type === "Transfers" && transfers_categories.map((transaction, index) => (
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

const styles = {
  buttonCard: (color: string) => ({
    aspectRatio: 1 / 1,
    width: "100%",
    margin: "auto", // Minimal margin for spacing
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    boxShadow: "none",
    color: "#007aff"
  }),
  cardContent: {
    textAlign: "center",
    padding: 0,
    fontSize: "15px"
  },
};

interface ModalProps {
  type: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSkip: () => void;
  handleSelectTemplate: (item: any) => void;
}