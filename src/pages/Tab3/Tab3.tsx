import { IonCard, IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import { AccountCard } from './components/AccountCard';
import { useEffect, useState } from 'react';

export const Tab3 = () => {
  const [error, setError] = useState<string | null>(null);

  const getToken = async () => {
    const proxyUrl = import.meta.env.VITE_FIREBASE_FUNCTIONS_PROXY_URL;

    try {
      const result = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "secret_id": import.meta.env.VITE_GOCARDLESS_SECRET_ID,
          "secret_key": import.meta.env.VITE_GOCARDLESS_SECRET_KEY
        }),
      });

      const data = await result.json();
      return data;
    } catch (err: any) {
      setError(`Error: ${err.message}`);
      console.error('Error:', err);
    }
  };


  useEffect(() => {
    getToken().then((result) => {
      console.log(result)
    });
  }, [])
  return (
    <>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Bank of Cyprus</IonLabel>
        </IonItemDivider>

        <IonCard>
          <AccountCard id='1' bank='Hellenic Bank' accountName='Georgiou Andreas' accountNumber='472-01-975274-01' accountType='Savings Account' user='Andreas' balance='€3500' />
          <hr
            style={{
              borderTop: '1px solid #e4e4e4',
              margin: '0 15px',
            }}
          />
          <AccountCard id='1' bank='Hellenic Bank' accountName='Chatzianastasi Konstantina' accountNumber='472-01-975274-01' accountType='180Days Notice' user='Andreas' balance='€2700' />
        </IonCard>

        <IonItem>
          <IonLabel>Argentina</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Armenia</IonLabel>
        </IonItem>
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Hellenic Bank</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Bangladesh</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Belarus</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Belgium</IonLabel>
        </IonItem>
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Revolut</IonLabel>
        </IonItemDivider>

        <IonItem>
          <IonLabel>Bangladesh</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Belarus</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Belgium</IonLabel>
        </IonItem>
      </IonItemGroup>
    </>
  );
}
