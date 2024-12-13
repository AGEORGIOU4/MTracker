import React, { useState } from 'react';
import {
  IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar,
  IonList, IonItem, IonLabel,
  IonGrid, IonRow, IonCol, IonIcon, IonDatetime, IonAlert,
  IonDatetimeButton,
  IonText
} from '@ionic/react';
import { person, wallet, pricetag, card, syncCircle, pencil, logoEuro, businessOutline, business } from 'ionicons/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../auth/firebase';

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
        <IonHeader >
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={handleClose}>Close</IonButton>
            </IonButtons>
            {/* <IonTitle>Transaction Details</IonTitle> */}
            <IonButtons slot="end">
              <IonButton color="danger" onClick={handleDelete}>Delete</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            <IonGrid>

              {/* Date */}
              <IonRow>
                <IonCol size="12">
                  <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime disabled id="datetime" value={selectedTransaction?.date}></IonDatetime>
                  </IonModal>
                </IonCol>
              </IonRow>

              {/* User */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={person} color='primary' />
                    <IonLabel className="ion-text-wrap">User</IonLabel>
                    <IonText>{selectedTransaction?.user}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Type */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={wallet} color='primary' />
                    <IonLabel className="ion-text-wrap">Type</IonLabel>
                    <IonText>{selectedTransaction?.type}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Category */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pricetag} color='primary' />
                    <IonLabel className="ion-text-wrap">Category</IonLabel>
                    <IonText>{selectedTransaction?.category}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/*Payment Method */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={syncCircle} color='primary' />
                    <IonLabel className="ion-text-wrap">Payment Method</IonLabel>
                    <IonText>{selectedTransaction?.paymentMethod}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/*Bank */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={business} color='primary' />
                    <IonLabel className="ion-text-wrap">Bank</IonLabel>
                    <IonText>{selectedTransaction?.bank}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Account */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={card} color='primary' />
                    <IonLabel className="ion-text-wrap">Account</IonLabel>
                    <IonText>{selectedTransaction?.account}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>



              {/* Description */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pencil} color='primary' />
                    <IonLabel className="ion-text-wrap">Description</IonLabel>
                    <IonText>{selectedTransaction?.description}</IonText>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/*  Amount */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={logoEuro} color='primary' />
                    <IonLabel className="ion-text-wrap">Amount</IonLabel>
                    <IonText>{selectedTransaction?.amount}</IonText>
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

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTransaction: any;
  refreshTransactions: () => void;
}