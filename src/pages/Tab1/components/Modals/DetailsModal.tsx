import React from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonDatetime,
} from '@ionic/react';
import {
  person,
  wallet,
  pricetag,
  card,
  syncOutline,
  calendarClear,
  sync,
  syncCircle,
} from 'ionicons/icons';
import {
  transaction_accounts,
  transaction_categories,
  transaction_methods,
  transaction_types,
  transaction_users,
} from '../../../../utils/options';

const styles = {
  button: {
    margin: '10px auto',
  },
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTemplate: string;
}

export const DetailsModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  selectedTemplate,
}) => {


  const handleSave = () => {
    // Retrieve existing transactions from localStorage
    const storedItems = localStorage.getItem("transactions");
    const transactions = storedItems ? JSON.parse(storedItems) : [];

    // Example of extracting input values (adjust IDs to match actual implementation)
    const newTransaction = {
      id: new Date().toISOString(), // Unique ID based on timestamp
      date: document.querySelector('ion-datetime')?.value || new Date().toISOString(), // Get date or use current date
      description: (document.querySelector('[placeholder="Enter transaction"]') as HTMLInputElement)?.value || '',
      category: selectedTemplate || "Uncategorized", // Use selected category or default
      account: document.querySelector('ion-select[label="Account"]')?.getAttribute('value') || "Unknown",
      amount: (document.querySelector('ion-input[label="Amount"]') as HTMLInputElement)?.value || "0",
      owner: document.querySelector('ion-select[label="User"]')?.getAttribute('value') || "Unknown",
      photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff',
    };

    // Push the new transaction to the existing array
    transactions.push(newTransaction);

    // Save updated transactions back to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Optionally, log the new transaction or notify the user
    console.log("Transaction saved:", newTransaction);

    // Close the modal
    setIsOpen(false);
  };



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
            <IonTitle></IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => console.log('Confirm')}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={person} color='primary' />
                    <IonSelect label="User" value={'Andreas'} labelPlacement="stacked">
                      {transaction_users.map((user, index) => (
                        <IonSelectOption key={index} value={user.value}>
                          {user.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={wallet} color='primary' />
                    <IonSelect label="Type" value={'Expense'} labelPlacement="stacked">
                      {transaction_types.map((type, index) => (
                        <IonSelectOption key={index} value={type.value}>
                          {type.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={pricetag} color='primary' />
                    <IonSelect
                      label="Category"
                      value={selectedTemplate}
                      labelPlacement="stacked"
                    >
                      {transaction_categories.map((category, index) => (
                        <IonSelectOption key={index} value={category.value}>
                          {category.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={card} color='primary' />
                    <IonSelect
                      label="Account"
                      value={'Joint'}
                      labelPlacement="stacked"
                    >
                      {transaction_accounts.map((account, index) => (
                        <IonSelectOption key={index} value={account.value}>
                          {account.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem>
                    <IonIcon slot="start" icon={syncCircle} color='primary' />
                    <IonSelect
                      label="Method"
                      value={'Revolut'}
                      labelPlacement="stacked"
                    >
                      {transaction_methods.map((method, index) => (
                        <IonSelectOption key={index} value={method.value}>
                          {method.label}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem>

                    <IonDatetime presentation="date" preferWheel={true} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="8">
                  <IonItem>
                    <IonInput
                      labelPlacement="stacked"
                      label="Description"
                      placeholder="Enter transaction"
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem>
                    <IonInput labelPlacement="stacked" label="Amount" />
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size='12'>
                  <IonButton expand='block' onClick={() => handleSave()}>
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
