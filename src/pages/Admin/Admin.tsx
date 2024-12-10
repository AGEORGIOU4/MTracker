import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, query, where, collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../auth/firebase';
import { convertBoCCSVToJSON, convertRevolutCSVToJSON } from './functions';

export const Admin: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = async () => {
    if (jsonData.length === 0) {
      console.log("No transactions to save");
      return;
    }

    setIsSaving(true); // Show progress bar during saving

    try {
      try {
        for (const transaction of jsonData) {
          const { id, user, type, category, method, account, date, description, amount, timestamp } = transaction;
          const newTransaction = { id, user, type, category, method, account, date, description, amount, };

          const transactionsRef = collection(db, "transactions");
          const q: any = query(
            transactionsRef,
            where("description", "==", description),
            where("date", "==", date),
            where("amount", "==", amount)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {

            const docRef = querySnapshot.docs[0].ref; // Get reference to the first document

            await updateDoc(docRef, {
              ...newTransaction,
            });
            console.log(`Transaction with ID ${id} updated successfully.`);
          } else {
            const transactionRef = doc(db, "transactions", id); // Use provided ID for the new document

            await setDoc(transactionRef, {
              ...newTransaction,
              timestamp: timestamp,
            });
            console.log(`Transaction with ID ${id} saved successfully.`);
          }
        }
      } catch (error) {
        console.error('Error saving or updating transactions:', error);
      }
    } catch (error) {
      console.error('Error saving or updating transactions:', error);
    } finally {
      setIsSaving(false)
    }
  };

  const handleRefresh = () => {
    setJsonData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setJsonData: any, selectedBank: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parsedJSON = selectedBank === "Revolut" ? convertRevolutCSVToJSON(text) : convertBoCCSVToJSON(text);
        setJsonData(parsedJSON);
      };
      reader.readAsText(file);
    }
  };


  return (
    <>
      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => {
            handleRefresh();
            event.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>

        {/* Bank Selection */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Select Bank</IonCardTitle>
            <IonCardSubtitle>Upload transactions (.csv)</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSelect
              mode='ios'
              interface="popover"
              label="Bank"
              labelPlacement="floating" fill="solid"
              value={selectedBank}
              onIonChange={(e) => setSelectedBank(e.detail.value)}
            >
              <IonSelectOption value={"Revolut"}>Revolut</IonSelectOption>
              <IonSelectOption value={"Bank of Cyprus"}>Bank of Cyprus</IonSelectOption>
              <IonSelectOption value={"Hellenic Bank"}>Hellenic Bank</IonSelectOption>
            </IonSelect>

            <input
              disabled={!selectedBank}
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => handleFileUpload(e, setJsonData, selectedBank)}
              style={{ marginBottom: "20px" }}
            />


            {isSaving &&
              <>
                <IonProgressBar type="indeterminate" />
                <br />
              </>}


            <IonButton disabled={isSaving} expand="block" onClick={handleSave}>
              Save Transactions
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Display JSON Data */}
        <IonCard>
          <IonCardHeader>

            <IonCardSubtitle>Transactions</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {jsonData ? JSON.stringify(jsonData, null, 2) : "No data uploaded"}
            </pre>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
};