import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { toLocalISOString } from '../../utils/functions';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../utils/firebase';

export const Admin: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parsedJSON = convertCSVToJSON(text);
        setJsonData(parsedJSON);
      };
      reader.readAsText(file);
    }
  };



  const convertCSVToJSON = (csvText: string) => {
    const rows = csvText.split("\n").filter((row) => row.trim() !== "");
    let headers = rows[0].split(",").map((h) => h.trim());

    // To FIX

    // if (selectedBank === "Bank of Cyprus") {
    //   headers = rows[5].split(",").map((h) => h.trim());
    //   return rows.slice(6).map((row) => {
    //     const values = row.split(",").map((v) => v.trim());

    //     const debitValue = parseNumber(values[headers.indexOf("Debit")]);
    //     const creditValue = parseNumber(values[headers.indexOf("Credit")]);
    //     const amount = debitValue || creditValue || 0;

    //     const determineType = () => {
    //       if (debitValue) return "Transfers";
    //       if (creditValue) return "Income";
    //       return "Expenses"
    //     };

    //     return {
    //       type: determineType(),
    //       description: values[headers.indexOf("Description")] || "N/A",
    //       category: "Uncategorized",
    //       method: "Bank of Cyprus",
    //       amount: Math.abs(amount), // Use the absolute value of the amount
    //       id: parseDate(values[headers.indexOf("Date")]),
    //       user: "Andreas",
    //       account: "Joint",
    //       date: parseDate(values[headers.indexOf("Date")]),
    //       timestamp: generateTimestamp(values[headers.indexOf("Date")]),
    //     };
    //   }).filter((row) => row !== null); // Filter out null rows
    // }

    return rows.slice(1).map((row) => {
      const values = row.split(",").map((v) => v.trim());

      const state = values[headers.indexOf("State")];
      if (state !== "COMPLETED") return null; // Skip rows that are not COMPLETED

      const amount = parseFloat(values[headers.indexOf("Amount")]) || 0;
      const rawType = values[headers.indexOf("Type")];

      const determineType = () => {
        if (amount < 0) return "Expenses";
        if (rawType === "TRANSFER") return "Transfers";
        return "Income";
      };

      return {
        type: determineType(),
        description: values[headers.indexOf("Description")] || "N/A",
        category: "Uncategorized",
        method: "Revolut",
        amount: Math.abs(amount),
        id: parseDate(values[headers.indexOf("Started Date")]),
        user: "Andreas",
        account: "Joint",
        date: parseDate(values[headers.indexOf("Started Date")]),
        timestamp: generateTimestamp(values[headers.indexOf("Started Date")]),
      };
    }).filter((row) => row !== null);
  };


  const parseDate = (dateString: string) => {
    return toLocalISOString(dateString);
  };

  const generateTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const milliseconds = date.getTime(); // Get time in milliseconds since epoch

    return {
      seconds: Math.floor(milliseconds / 1000), // Convert to seconds
      nanoseconds: (milliseconds % 1000) * 1e6, // Convert the remainder to nanoseconds
    };
  };

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
          const newTransaction = {
            id,
            user,
            type,
            category,
            method,
            account,
            date,
            description,
            amount,
          };

          const transactionRef = doc(db, "transactions", id);
          const docSnap = await getDoc(transactionRef);

          if (docSnap.exists()) {
            await updateDoc(transactionRef, {
              ...newTransaction,
              timestamp: timestamp,
            });
            console.log(`Transaction with ID ${id} updated successfully.`);
          } else {
            // Document doesn't exist, so create it
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
      for (const transaction of jsonData) {
        const { id, user, type, category, method, account, date, description, amount, timestamp } = transaction;

        const newTransaction = {
          id,
          user,
          type,
          category,
          method,
          account,
          date,
          description,
          amount,
        };

        const transactionRef = doc(db, "transactions", id);
        const docSnap = await getDoc(transactionRef); // Check if the document exists

        if (docSnap.exists()) {
          // Document exists, so update it
          await updateDoc(transactionRef, {
            ...newTransaction,
            timestamp: timestamp, // Make sure the timestamp is updated
          });
          console.log(`Transaction with ID ${id} updated successfully.`);
        } else {
          // Document doesn't exist, so create it
          await setDoc(transactionRef, {
            ...newTransaction,
            timestamp: timestamp,
          });
          console.log(`Transaction with ID ${id} saved successfully.`);
        }
      }
    } catch (error) {
      console.error('Error saving or updating transactions:', error);
    } finally {
      setIsSaving(false)
    }
  };

  const handleRefresh = () => {
    setJsonData([]);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
              onChange={handleFileUpload}
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
    </IonPage >
  );
};