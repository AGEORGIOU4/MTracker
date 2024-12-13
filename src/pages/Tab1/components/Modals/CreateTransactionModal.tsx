import React, { useEffect, useState } from 'react';
import {
  IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar,
  IonTitle, IonList, IonItem, IonSelect, IonSelectOption, IonInput,
  IonGrid, IonRow, IonCol, IonIcon, IonDatetimeButton,
  IonTextarea,
  IonDatetime,
  IonAlert
} from '@ionic/react';
import { person, pricetag, card, syncCircle, pencil, logoEuro, business } from 'ionicons/icons';
import { accountTypes, banks, payment_categories, paymentMethods, users } from '../../../../utils/options';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../auth/firebase';
import { toLocalISOStringDate } from '../../../../utils/functions';

export const CreateTransactionModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, selectedTemplate, refreshTransactions }) => {
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [bank, setBank] = useState('Revolut');
  const [account, setAccount] = useState("Joint");
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Debit');
  const [user, setUser] = useState('Andreas');
  const [category, setCategory] = useState(selectedTemplate || 'Other');
  const [date, setDate] = useState<any>(toLocalISOStringDate(new Date()));

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setCategory(selectedTemplate || "Other");
  }, [selectedTemplate]);

  const resetFields = () => {
    setDescription('');
    setPaymentMethod('Bank Transfer');
    setBank('Revolut');
    setAccount('Joint');
    setAmount('');
    setType('Debit');
    setUser('Andreas');
    setCategory('Other');
    setDate(toLocalISOStringDate(new Date()));
  };

  const handleSave = async () => {
    if (!description || !amount) {
      setShowAlert(true)
    } else {
      const id = date;
      const newTransaction = {
        id,
        description,
        paymentMethod,
        bank: bank,
        account,
        amount: parseFloat(amount) || 0,
        type,
        user,
        category,
        date
      };

      try {
        const transactionRef = doc(db, "transactions", id);
        await setDoc(transactionRef, {
          ...newTransaction,
          timestamp: date,
        });
      } catch (error) {
        console.error('Error saving transaction:', error);
      }

      refreshTransactions();
      resetFields();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Confirmation Alert */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Fields Required"
        message="Please fill description and amount fields"
        buttons={[

          {
            text: 'Ok',
            // handler: handleConfirmDelete,
          },
        ]}
      />

      <IonModal isOpen={isOpen}>
        <IonHeader >
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            {/* <IonTitle>Transaction Details</IonTitle> */}
            <IonButtons slot="end">
              <IonButton color="primary" onClick={handleSave}>Confirm</IonButton>
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
                    <IonDatetime id="datetime"
                      value={date}
                      onIonChange={(e) => setDate(e.detail.value!)}></IonDatetime>
                  </IonModal>
                </IonCol>
              </IonRow>

              {/* User */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={person} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="User"
                      labelPlacement="floating" fill="solid"
                      value={user}
                      onIonChange={(e) => setUser(e.detail.value)}
                    >
                      {users.map((u, index) => (
                        <IonSelectOption key={index} value={u.value}>
                          {u.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Category */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pricetag} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="Category"
                      labelPlacement="floating" fill="solid"
                      value={category}
                      onIonChange={(e) => setCategory(e.detail.value)}
                    >
                      {payment_categories.map((p, index) => (
                        <IonSelectOption key={index} value={p.value}>
                          {p.label}
                        </IonSelectOption>
                      ))}

                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/*Payment Method */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={syncCircle} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="Method"
                      labelPlacement="floating" fill="solid"
                      value={paymentMethod}
                      onIonChange={(e) => setPaymentMethod(e.detail.value)}
                    >
                      {paymentMethods.map((m, index) => (
                        <IonSelectOption key={index} value={m}>
                          {m}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/*Bank */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={business} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="Bank"
                      labelPlacement="floating" fill="solid"
                      value={bank}
                      onIonChange={(e) => setBank(e.detail.value)}
                    >
                      {banks.map((b, index) => (
                        <IonSelectOption key={index} value={b.value}>
                          {b.value}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Account */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={card} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="Account"
                      labelPlacement="floating" fill="solid"
                      value={account}
                      onIonChange={(e) => setAccount(e.detail.value)}
                    >
                      {accountTypes.map((a, index) => (
                        <IonSelectOption key={index} value={a.value}>
                          {a.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Description */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pencil} color='primary' />
                    <IonTextarea
                      mode='ios'
                      label="Description"
                      labelPlacement="floating" fill="solid"
                      value={description}
                      onIonInput={(e) => setDescription(e.detail.value!)}
                      autoFocus
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Amount */}
              <IonRow>
                <IonCol size='12'>
                  <IonItem>
                    <IonIcon slot="start" icon={logoEuro} color='primary' />
                    <IonInput
                      mode='ios'
                      label="Amount"
                      labelPlacement="floating" fill="solid"
                      type="number"
                      value={amount}
                      onIonInput={(e) => setAmount(e.detail.value!)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonButton expand="block" onClick={handleSave}>
                    Save
                  </IonButton>
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
  type: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTemplate: string;
  refreshTransactions: () => void;
}
