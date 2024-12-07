import React, { useState } from 'react';
import {
  IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar,
  IonTitle, IonList, IonItem, IonSelect, IonSelectOption, IonLabel,
  IonGrid, IonRow, IonCol, IonIcon, IonDatetime, IonAlert,
  IonDatetimeButton
} from '@ionic/react';
import { person, wallet, pricetag, card, syncCircle } from 'ionicons/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTransaction: any;
  refreshTransactions: () => void;
}

export const ViewDetailsModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, selectedTransaction, refreshTransactions }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(selectedTransaction)
      const transactionDocRef = doc(db, "transactions", selectedTransaction.id);
      await deleteDoc(transactionDocRef);

      console.log('Transaction Deleted:', selectedTransaction);
      refreshTransactions()
      //setIsOpen(false);
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <>
      {/* Confirmation Alert */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Confirm Deletion"
        message="Are you sure you want to delete this transaction?"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: handleCancelDelete,
          },
          {
            text: 'Delete',
            handler: handleConfirmDelete,
          },
        ]}
      />

      {/* Modal */}
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={handleClose}>Close</IonButton>
            </IonButtons>
            <IonTitle>Transaction Details</IonTitle>
            <IonButtons slot="end">
              <IonButton color="danger" onClick={handleDelete}>Delete</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            <IonGrid>
              {/* User */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={person} color='primary' />
                    <IonLabel className="ion-text-wrap" slot="end">{selectedTransaction?.user}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Type */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={wallet} color='primary' />
                    <IonLabel className="ion-text-wrap" slot="end">{selectedTransaction?.type}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Category */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pricetag} color='primary' />
                    <IonLabel className="ion-text-wrap" slot="end">{selectedTransaction?.category}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Method */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={syncCircle} color='primary' />
                    <IonLabel className="ion-text-wrap" slot="end">{selectedTransaction?.method}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Account */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={card} color='primary' />
                    <IonLabel className="ion-text-wrap" slot="end">{selectedTransaction?.account}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Date */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                      <IonDatetime id="datetime" value={selectedTransaction?.date}></IonDatetime>
                    </IonModal>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Description and Amount */}
              <IonRow>
                <IonCol size="8">
                  <IonItem>
                    <IonLabel className="ion-text-wrap" >{selectedTransaction?.description}</IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem>
                    <IonLabel className="ion-text-wrap" >{selectedTransaction?.amount}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};
