import React, { useEffect, useState } from 'react';
import {
  IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar,
  IonTitle, IonList, IonItem, IonSelect, IonSelectOption, IonInput,
  IonGrid, IonRow, IonCol, IonIcon, IonDatetime
} from '@ionic/react';
import { person, wallet, pricetag, card, syncCircle } from 'ionicons/icons';
import { accounts, categories, methods, types, users } from '../../../../utils/options';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTemplate: string;
  refreshTransactions: () => void;
}

export const EditDetailsModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  selectedTemplate,
  refreshTransactions
}) => {
  // State variables to manage form inputs
  const [user, setUser] = useState('Andreas');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState(selectedTemplate || 'Other');
  const [method, setMethod] = useState('Revolut');
  const [account, setAccount] = useState('Joint');
  const [date, setDate] = useState(new Date().toISOString());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');


  useEffect(() => {
    setCategory(selectedTemplate || "Other")
  }, [selectedTemplate])

  const resetFields = () => {
    setUser('Andreas');
    setType('Expense');
    setCategory('Other');
    setMethod('Revolut');
    setAccount('Joint');
    setDate(new Date().toISOString());
    setDescription('');
    setAmount('');
  };

  const handleSave = async () => {
    const id = uuidv4();
    const newTransaction = {
      id: id,
      user,
      type,
      category,
      method,
      account,
      date,
      description,
      amount: parseFloat(amount) || 0,
    };

    try {
      const transactionRef = doc(db, "transactions", id);
      await setDoc(transactionRef, {
        ...newTransaction,
        timestamp: new Date(),
      });

    } catch (error) {
      console.error('Error saving transaction:', error);
    }

    refreshTransactions();
    resetFields();
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
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
            {/* User */}
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonIcon slot="start" icon={person} color='primary' />
                  <IonSelect
                    label="User"
                    value={user}
                    onIonChange={(e) => setUser(e.detail.value)}
                    labelPlacement="stacked"
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

            {/* Type */}
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonIcon slot="start" icon={wallet} color='primary' />
                  <IonSelect
                    label="Type"
                    value={type}
                    onIonChange={(e) => setType(e.detail.value)}
                    labelPlacement="stacked"
                  >
                    {types.map((t, index) => (
                      <IonSelectOption key={index} value={t.value}>
                        {t.label}
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
                    label="Category"
                    value={category}
                    onIonChange={(e) => setCategory(e.detail.value)}
                    labelPlacement="stacked"
                  >
                    {categories.map((c, index) => (
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
                    label="Method"
                    value={method}
                    onIonChange={(e) => setMethod(e.detail.value)}
                    labelPlacement="stacked"
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
                    label="Account"
                    value={account}
                    onIonChange={(e) => setAccount(e.detail.value)}
                    labelPlacement="stacked"
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

            {/* Date */}
            <IonRow>
              <IonCol size="12">
                <IonItem>
                  <IonDatetime
                    presentation="date"
                    preferWheel
                    value={date}
                    onIonChange={(e) => setDate(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* Description and Amount */}
            <IonRow>
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    label="Description"
                    labelPlacement="stacked"
                    placeholder="Enter transaction"
                    value={description}
                    onIonInput={(e) => setDescription(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="4">
                <IonItem>
                  <IonInput
                    label="Amount"
                    labelPlacement="stacked"
                    type="number"
                    value={amount}
                    onIonInput={(e) => setAmount(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            {/* Save Button */}
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
  );
};
