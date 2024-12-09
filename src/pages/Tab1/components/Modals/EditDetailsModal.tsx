import React, { useEffect, useState } from 'react';
import {
  IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar,
  IonTitle, IonList, IonItem, IonSelect, IonSelectOption, IonInput,
  IonGrid, IonRow, IonCol, IonIcon, IonDatetimeButton,
  IonTextarea,
  IonDatetime,
  IonAlert
} from '@ionic/react';
import { person, pricetag, card, syncCircle, wallet, home, pencil, logoEuro } from 'ionicons/icons';
import { accounts, expenses_categories, income_categories, methods, transfers_categories, users } from '../../../../utils/options';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import { formatDateToCustomString, toLocalISOString, toLocalISOStringDate } from '../../../../utils/functions';

export const EditDetailsModal: React.FC<ModalProps> = ({ type, isOpen, setIsOpen, selectedTemplate, refreshTransactions }) => {
  const [user, setUser] = useState('Andreas');
  const [category, setCategory] = useState(selectedTemplate || 'Other');
  const [method, setMethod] = useState('Revolut');
  const [account, setAccount] = useState(type === "Expenses" ? 'Joint' : "Personal");
  const [date, setDate] = useState<any>(toLocalISOStringDate(new Date()));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setCategory(selectedTemplate || "Other");
  }, [selectedTemplate]);

  const resetFields = () => {
    setUser('Andreas');
    setCategory('Other');
    setMethod('Revolut');
    setAccount('Joint');
    setDate(toLocalISOStringDate(new Date()));
    setDescription('');
    setAmount('');
  };

  const handleSave = async () => {
    if (!description || !amount) {
      setShowAlert(true)
    } else {
      let formattedDate = formatDateToCustomString(date);
      formattedDate = toLocalISOString(formattedDate)

      const id = formattedDate;
      const newTransaction = {
        id,
        user,
        type,
        category,
        method,
        account,
        date: formattedDate,
        description,
        amount: parseFloat(amount) || 0,
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
        <IonHeader mode='ios'>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="medium" onClick={() => setIsOpen(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Transaction Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSave}>Confirm</IonButton>
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
                      {type === "Expenses" && expenses_categories.map((c, index) => (
                        <IonSelectOption key={index} value={c.value}>
                          {c.label}
                        </IonSelectOption>
                      ))}
                      {type === "Income" && income_categories.map((c, index) => (
                        <IonSelectOption key={index} value={c.value}>
                          {c.label}
                        </IonSelectOption>
                      ))}
                      {type === "Transfers" && transfers_categories.map((c, index) => (
                        <IonSelectOption key={index} value={c.value}>
                          {c.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Method */}
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={syncCircle} color='primary' />
                    <IonSelect
                      mode='ios'
                      label="Method"
                      labelPlacement="floating" fill="solid"
                      value={method}
                      onIonChange={(e) => setMethod(e.detail.value)}
                    >
                      {methods.map((m, index) => (
                        <IonSelectOption key={index} value={m.value}>
                          {m.label}
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
                      {accounts.map((a, index) => (
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
                  <IonButton mode='ios' expand="block" onClick={handleSave}>
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
