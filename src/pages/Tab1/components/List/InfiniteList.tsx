import React, { useState } from 'react';
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList
} from '@ionic/react';
import TransactionCard from './TransactionCard';
import { initialTransactions, transaction_categories } from '../../../../utils/options';

const styles = {
  dateText: {
    color: 'var(--ion-text-color-light)',
  },
};

function InfiniteList() {
  const [items, setItems] = useState(initialTransactions);

  const generateItems = () => {
    const newTransactions = Array.from({ length: 5 }, (_, i) => ({
      id: `${items.length + i}`,
      date: new Date().toISOString().split('T')[0],
      description: `Generated Item ${items.length + i}`,
      category: `Loans`,
      account: 'Generated Account',
      amount: "50",
      owner: `Owner ${items.length + i}`,
      photo: 'https://ui-avatars.com/api/?name=Andreas+Georgiou&background=0D8ABC&color=fff',
    }));
    setItems((prevItems: any) => [...prevItems, ...newTransactions]);
  };

  return (
    <IonContent>
      <IonList>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <div style={{ textAlign: 'right', padding: '0px 20px 5px' }}>
              <small style={styles.dateText}>{item.date}</small>
            </div>
            <TransactionCard
              description={item.description}
              account={item.account}
              avatar={item.photo}
              category={item.category}
              amount={"-€".concat(item.amount)}
              color={transaction_categories.find((transaction) => transaction.value === item.category)?.color || '#dedede'}

            />
          </React.Fragment>
        ))}
      </IonList>
      {/* <IonInfiniteScroll
        onIonInfinite={(ev) => {
          generateItems();
          setTimeout(() => ev.target.complete(), 500);
        }}
      >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
      <br />
      <br />
      <br />
      <br />
    </IonContent>

  );
}

export default InfiniteList;
