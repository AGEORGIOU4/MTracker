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
  IonDatetimeButton,
  IonDatetime,
} from '@ionic/react';
import { transaction_accounts, transaction_categories, transaction_methods, transaction_types, transaction_users } from '../../../../utils/options';


const styles = {
  button: {
    margin: "10px auto"
  }
}
interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedTemplate: string;

}

export const DetailsModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, selectedTemplate }) => {
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
              <IonButton onClick={() => console.log("Confirm")}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>

            <IonGrid>


              <IonRow>
                <IonCol size='12'>
                  <IonItem>
                    <IonSelect label="User" value={"Andreas"} labelPlacement="stacked">
                      {transaction_users.map((user, index) => {
                        return (
                          <IonSelectOption key={index} value={user.value}>{user.label}</IonSelectOption>
                        )
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>

                <IonCol size='6'>
                  <IonItem>
                    <IonSelect label="Type" value={"Expense"} labelPlacement="stacked">
                      {transaction_types.map((type, index) => {
                        return (
                          <IonSelectOption key={index} value={type.value}>{type.label}</IonSelectOption>
                        )
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
                <IonCol size='6'>
                  <IonItem>
                    <IonSelect label="Type" value={selectedTemplate} labelPlacement="stacked">
                      {transaction_categories.map((category, index) => {
                        return (
                          <IonSelectOption key={index} value={category.value}>{category.label}</IonSelectOption>
                        )
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size='6'>
                  <IonItem>
                    <IonSelect label="Account" value={"Joint"} labelPlacement="stacked">
                      {transaction_accounts.map((account, index) => {
                        return (
                          <IonSelectOption key={index} value={account.value}>{account.label}</IonSelectOption>
                        )
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
                <IonCol size='6'>
                  <IonItem>
                    <IonSelect label="Method" value={"Revolut"} labelPlacement="stacked">
                      {transaction_methods.map((method, index) => {
                        return (
                          <IonSelectOption key={index} value={method.value}>{method.label}</IonSelectOption>
                        )
                      })}
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              <br />
              <br />

              <IonRow>
                <IonCol size='12'>
                  <IonItem>
                    <IonDatetime presentation="date" preferWheel={true}></IonDatetime>;
                  </IonItem>
                </IonCol>
              </IonRow>



              <IonRow>
                <IonCol size='8'>
                  <IonItem>
                    <IonInput labelPlacement="stacked" label="Description" placeholder="Enter transaction"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size='4'>
                  <IonItem>
                    <IonInput labelPlacement="stacked" label="Amount" placeholder=""></IonInput>
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


