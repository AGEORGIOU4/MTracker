import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  IonModal,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonText,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonItem,
} from '@ionic/react';
import { transaction_accounts, transaction_categories, transaction_methods } from '../../../../utils/options';


interface TemplateModalProps {
  isModalVisible: boolean;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({ isModalVisible }) => {

  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(isModalVisible);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [transaction, setTransaction] = useState({
    textInput: '',
    numberInput: '',
    date: new Date().toISOString(),
    transactionType: data.selectedTab,
    category: 'Food',
    selectedName: 'Andreas',
    selectedMethod: '',
    selectedAccount: '',
  });

  console.log(data)
  useEffect(() => {
    setModalVisible(isModalVisible);
  }, [isModalVisible])

  useEffect(() => {
    setTransaction((prev) => ({ ...prev, transactionType: data.selectedTab }));
  }, [data]);

  const handleButtonClick = () => {
    if (data.selectedTab === 'Expenses') {
      setTemplateModalVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!transaction.textInput || !transaction.numberInput) {
      alert('Please fill in all required fields.');
      return;
    }
    resetTransaction();
    setModalVisible(false);
  };

  const resetTransaction = () => {
    setTransaction({
      textInput: '',
      numberInput: '',
      date: new Date().toISOString(),
      transactionType: data.selectedTab,
      category: 'Food',
      selectedName: 'Andreas',
      selectedMethod: '',
      selectedAccount: '',
    });
  };

  const handleTemplateSelect = (category: string) => {
    setTransaction((prev) => ({
      ...prev,
      category,
      textInput: `${category} - `,
      numberInput: '0',
    }));
    setTemplateModalVisible(false);
    setModalVisible(true);
  };

  return (
    <>
      {/* <IonButton shape="round" color="primary" onClick={handleButtonClick}>
        <IonText>+</IonText>
      </IonButton> */}

      {/* Main Modal */}
      <IonModal isOpen={modalVisible} onDidDismiss={() => setModalVisible(false)}>
        <IonContent>
          <IonLabel>Add Transaction</IonLabel>

          <IonButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? 'Edit Details' : 'Hide Details'}
          </IonButton>

          {!isCollapsed && (
            <>
              <IonSelect
                value={transaction.selectedName}
                onIonChange={(e) => handleInputChange('selectedName', e.detail.value)}
              >
                <IonSelectOption value="Andreas">Andreas</IonSelectOption>
                <IonSelectOption value="Constantina">Constantina</IonSelectOption>
                <IonSelectOption value="Both">Both</IonSelectOption>
              </IonSelect>

              <IonLabel>Date</IonLabel>
              <IonDatetime
                value={transaction.date}
                onIonChange={(e) => handleInputChange('date', e.detail.value)}
              ></IonDatetime>

              <IonSelect
                value={transaction.transactionType}
                onIonChange={(e) => handleInputChange('transactionType', e.detail.value)}
              >
                <IonSelectOption value="Expenses">Expenses</IonSelectOption>
                <IonSelectOption value="Income">Income</IonSelectOption>
                <IonSelectOption value="Transfers">Transfers</IonSelectOption>
              </IonSelect>

              <IonSelect
                value={transaction.category}
                onIonChange={(e) => handleInputChange('category', e.detail.value)}
              >
                {transaction_categories.map((category) => (
                  <IonSelectOption key={category.value} value={category.value}>
                    {category.label}
                  </IonSelectOption>
                ))}
              </IonSelect>

              <IonSelect
                value={transaction.selectedMethod}
                onIonChange={(e) => handleInputChange('selectedMethod', e.detail.value)}
              >
                {transaction_methods.map((method) => (
                  <IonSelectOption key={method.value} value={method.value}>
                    {method.label}
                  </IonSelectOption>
                ))}
              </IonSelect>

              <IonSelect
                value={transaction.selectedAccount}
                onIonChange={(e) => handleInputChange('selectedAccount', e.detail.value)}
              >
                {transaction_accounts.map((account) => (
                  <IonSelectOption key={account.value} value={account.value}>
                    {account.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </>
          )}

          {isCollapsed && (
            <>
              <IonLabel>Description</IonLabel>
              <IonInput
                value={transaction.textInput}
                placeholder="Description"
                onIonChange={(e) => handleInputChange('textInput', e.detail.value!)}
              ></IonInput>

              <IonLabel>Amount</IonLabel>
              <IonInput
                type="number"
                value={transaction.numberInput}
                placeholder="Enter Amount"
                onIonChange={(e) => handleInputChange('numberInput', e.detail.value!)}
              ></IonInput>

              <IonButton onClick={handleSave}>SAVE</IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* Template Modal */}
      <IonModal isOpen={templateModalVisible} onDidDismiss={() => setTemplateModalVisible(false)}>
        <IonContent>
          <IonLabel>Select a Template</IonLabel>
          {transaction_categories.map((category) => (
            <IonButton
              key={category.value}
              style={{ backgroundColor: '#dedede' }}
              onClick={() => handleTemplateSelect(category.value)}
            >
              {category.label}
            </IonButton>
          ))}
          <IonButton onClick={() => setModalVisible(true)}>SKIP</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

