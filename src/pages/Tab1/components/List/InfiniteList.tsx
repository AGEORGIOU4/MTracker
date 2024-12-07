import React, { useState } from 'react';
import { IonContent, IonList } from '@ionic/react';
import TransactionCard from './TransactionCard';
import { initialTransactions, transaction_categories } from '../../../../utils/options';

// Explicitly define styles as React.CSSProperties
const styles: { list: React.CSSProperties, dateDiv: React.CSSProperties; dateText: React.CSSProperties } = {
  list: {
    marginBottom: "100px"
  },
  dateDiv: {
    textAlign: "end",
    padding: "0px 20px"
  },
  dateText: {
    color: "var(--ion-text-color-light)",
  },
};

function InfiniteList() {
  const [items, setItems] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : [];

    // Sort the transactions from newest to oldest
    return transactions.sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return (
    <IonContent>
      <IonList style={styles.list}>
        {items.map((item: any) => (
          <React.Fragment key={item.id}>
            <div style={styles.dateDiv}>
              <small style={styles.dateText}>{item.date}</small>
            </div>
            <TransactionCard
              description={item.description}
              account={item.account}
              avatar={item.photo}
              category={item.category}
              amount={"-€".concat(item.amount)}
              color={
                transaction_categories.find(
                  (transaction) => transaction.value === item.category
                )?.color || "#dedede"
              }
            />
          </React.Fragment>
        ))}
      </IonList>
    </IonContent>
  );
}

export default InfiniteList;
