import React, { useEffect, useState } from 'react';
import { IonContent, IonList, IonSpinner, IonText } from '@ionic/react';
import TransactionCard from './TransactionCard';
import { avatars, categories } from '../../../../utils/options';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../utils/firebase';
import { formatDateToDDMMYY } from '../../../../utils/functions';

// Explicitly define styles as React.CSSProperties
const styles: { list: React.CSSProperties, dateDiv: React.CSSProperties; dateText: React.CSSProperties, errorText: React.CSSProperties } = {
  list: { marginBottom: "150px" },
  dateDiv: { textAlign: "end", padding: "0px 20px" },
  dateText: { color: "var(--ion-text-color-light)" },
  errorText: { color: "red", textAlign: "center", marginTop: "20px" },
};

function TransactionsList({ items, loading, error, refreshTransactions }: { items: any[]; loading: boolean, error: string | null, refreshTransactions: () => void }) {
  if (loading) {
    return (
      <IonContent>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <IonSpinner name="crescent" />
          <p>Loading transactions...</p>
        </div>
      </IonContent>
    );
  }

  if (error) {
    return (
      <IonContent>
        <IonText style={styles.errorText}>{error}</IonText>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonList style={styles.list}>
        {items.length > 0 ? (
          items.map((item: any) => (
            <React.Fragment key={item.id || Math.random()}>
              <div style={styles.dateDiv}>
                <small style={styles.dateText}>{formatDateToDDMMYY(item.date)}</small>
              </div>
              <TransactionCard
                id={item.id}
                description={item.description || 'No Description'}
                type={item.type || 'No Type'}
                category={item.category || 'Uncategorized'}
                method={item.method || 'Unknown'}
                account={item.account || 'Unknown Account'}
                user={item.user || 'Unknown User'}
                amount={"€".concat((parseFloat(item.amount) || 0).toFixed(2))}
                date={item.date}
                avatar={avatars.find((avatar) => avatar.user === item.user)?.photo || 'https://via.placeholder.com/40'}
                color={categories.find((category) => category.value === item.category)?.color || "#dedede"}
                refreshTransactions={refreshTransactions}
              />
            </React.Fragment>
          ))
        ) : (
          <IonText style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>
            No transactions available for the selected date.
          </IonText>
        )}
      </IonList>
    </IonContent>
  );
}

export default TransactionsList;
